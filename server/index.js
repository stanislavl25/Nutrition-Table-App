import { resolve } from "path";
import express from "express";
import cookieParser from "cookie-parser";
import { Shopify, ApiVersion } from "@shopify/shopify-api";
import "dotenv/config";
import applyAuthMiddleware from "./middleware/auth.js";
import verifyRequest from "./middleware/verify-request.js";
import db from "./db.js";
import ProductsLabels from "./models/productsLabels.js";
import StoreModel from "./models/storeModel.js";
import Products from "./models/productModel.js";
import AppSession from "./models/AppSessionModel.js";
import {
  storeCallback,
  loadCallback,
  deleteCallback,
} from "./custom-sessions.js";
const USE_ONLINE_TOKENS = true;
const TOP_LEVEL_OAUTH_COOKIE = "shopify_top_level_oauth";

const PORT = parseInt(process.env.PORT || "8081", 10);
const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
  API_VERSION: ApiVersion.April22,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.CustomSessionStorage(
    storeCallback,
    loadCallback,
    deleteCallback
  ),
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};
Shopify.Webhooks.Registry.addHandler("APP_UNINSTALLED", {
  path: "/webhooks",
  webhookHandler: async (topic, shop, body) => {
    delete ACTIVE_SHOPIFY_SHOPS[shop];
  },
});

// export for test use only
export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production"
) {
  const app = express();
  app.set("top-level-oauth-cookie", TOP_LEVEL_OAUTH_COOKIE);
  app.set("active-shopify-shops", ACTIVE_SHOPIFY_SHOPS);
  app.set("use-online-tokens", USE_ONLINE_TOKENS);
  app.use(express.json());
  app.use(cookieParser(Shopify.Context.API_SECRET_KEY));

  applyAuthMiddleware(app);

  app.post("/webhooks", async (req, res) => {
    try {
      await Shopify.Webhooks.Registry.process(req, res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
      res.status(500).send(error.message);
    }
  });

  /** handle food products save */
  app.post("/save_foodProducts", verifyRequest(app), async (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: "updates saved!", success: true });
  });

  /***handle non food save  */

  app.post("/save_non-food", verifyRequest(app), async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);
    const products = req.body.products;
    const storeId = session.shop;
    try {
      let updateData;
      for (var i = 0; i < products.length; i++) {
        updateData = await Products.findOneAndUpdate(
          { store_id: storeId, name: products[i] },
          { food_product: false }
        );
      }
      if (updateData)
        res.status(200).send({ message: "updates saved!", success: true });
    } catch (err) {
      res
        .status(400)
        .send({ message: "Something wrong happend!", success: false });
    }
  });
  /**
   * handle Language page changes
   */

  app.post("/LangFieldsSave", verifyRequest(app), async (req, res) => {
    const name = req.body.name;
    const value = req.body.value;
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);
    const store = session.shop;
    try {
      const update = { [name]: value };
      if (typeof name === "string" && typeof value === "string") {
        const updateData = await StoreModel.findOneAndUpdate(
          { shop_id: store },
          update,
          { returnOriginal: false }
        );
        // console.log(updateData);
        if (updateData) {
          res.status(200).send({
            success: true,
            message: "Changes Saved!",
          });
        }
      } else {
        throw new Error("type of data is bad!");
      }
    } catch (err) {
      res.status(400).send({ message: "Something wrong happend!" });
      console.log(err);
    }
  });

  /***
   * handle Language page data response
   */
  app.get("/LangData", verifyRequest(app), async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);
    const store = session.shop;
    const shopData = await StoreModel.find({ shop_id: store }).exec();
    if (shopData) {
      res
        .status(200)
        .send({ success: true, message: "Data Exists", data: shopData });
    } else {
      res
        .status(500)
        .send({ success: false, message: "something wrong happend!" });
    }
  });

  /**
   * returns the list of products on that specific shopify store
   */

  app.get("/products-save", verifyRequest(app), async (req, res) => {
    console.log("save products");
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);
    const { Product } = await import(
      `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
    );
    try {
      const storeProducts = await Product.all({
        session,
        fields: "id,title,product_type,images",
      });
      const shop = await checkShopExist(storeProducts[0]["session"].shop);
      if (storeProducts.length > 0) {
        for (var i = 0; i < storeProducts.length; i++) {
          checkProductsExist(storeProducts[i], shop.shop_id);
        }
      }
      res
        .status(200)
        .send({ data: shop, success: true, message: "data is back!" });
    } catch (err) {
      res.status(400).send("Something wrong happend");
      console.log(err);
    }
  });
  /***
   * handle recommended intake save
   */
  app.post("/recommendedIntake_save", verifyRequest(app), async (req, res) => {
    console.log(req.body);
    try {
      const update = await StoreModel.findOneAndUpdate(
        {
          shop_id: req.body.storeId,
        },
        {
          recommendedIntake: req.body.formVal,
        }
      );
      res.status(200).send({ message: "data updated" });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "something wrong happened" });
    }
  });

  /*** handle deleted store products */

  app.get("/deleted-store-products", verifyRequest(app), async (req, res) => {
    console.log("deleted store products");
    let array = [];
    let comparisonArray = [];
    try {
      const session = await Shopify.Utils.loadCurrentSession(req, res, true);
      const productsDatabase = await Products.find({
        store_id: session.shop,
      }).lean();
      const { Product } = await import(
        `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
      );
      const storeProducts = await Product.all({
        session,
        fields: "id,title,product_type,images",
      });
      if (storeProducts) {
        storeProducts.forEach((elem) => {
          let num = elem.id;
          let text = num.toString();
          array.push(text);
        });
      }
      if (productsDatabase) {
        productsDatabase.forEach((elem) => {
          comparisonArray.push(elem.productId);
        });
        comparisonArray.forEach(async (elem) => {
          if (!array.includes(elem)) {
            console.log(true);
            const deleteElement = await Products.findOneAndDelete({
              productId: elem,
            });
          } else {
            console.log(false);
          }
        });
        console.log("array", array);
        console.log("2nd array", comparisonArray);
      }
      res.status(200).send({ success: true, message: "products deleted!" });
    } catch (err) {
      res
        .status(400)
        .send({ success: false, message: "products not deleted!" });
    }
  });
  /***
   * get all products with the same shop_id
   */
  app.get("/products-list", verifyRequest(app), async (req, res) => {
    console.log("get products");
    try {
      const session = await Shopify.Utils.loadCurrentSession(req, res, true);
      const productsDatabase = await Products.find({
        store_id: session.shop,
      }).lean();
      res.status(200).send({
        data: productsDatabase,
        message: "found products!",
        success: true,
      });
    } catch (err) {
      res.status(400).send({ success: false, message: "no products found!" });
    }
  });

  /**check if the store exist */
  const checkShopExist = async (storeId) => {
    const check = await StoreModel.findOne({ shop_id: storeId }).exec();
    const data = check;
    if (check) return data;
    else return false;
  };
  /** check if the products exist */
  const checkProductsExist = async (product, shopId) => {
    const check = await Products.find({ productId: product.id });
    try {
      /** check if product has an updated name or image and update according to those */
      if (check) {
        if (product.images.length > 0) {
          if (
            check.length > 0 &&
            check[0].image === null &&
            check[0].image !== product.images[0].src
          ) {
            const update = await Products.findOneAndUpdate(
              { productId: product.id },
              { image: product.images[0].src },
              { returnOriginal: false }
            );
          }
        }
        if (
          !product.images.length > 0 &&
          check.length > 0 &&
          check[0].image !== null
        ) {
          const update = await Products.findOneAndUpdate(
            { productId: product.id },
            { image: null },
            { returnOriginal: false }
          );
        }
        if (check.length > 0 && check[0].name !== product.title) {
          const update = await Products.findOneAndUpdate(
            { productId: product.id },
            { name: product.title },
            { returnOriginal: false }
          );
        }
      }
      if (!check.length) {
        const productCreation = await Products.create({
          name: product.title,
          store_id: shopId,
          productId: product.id,
          image: product.images.length ? product.images[0].src : null,
          product_type: product.product_type,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  /**return the locations object */

  app.get("/locations", verifyRequest(app), async (req, res) => {
    const { Location } = await import(
      `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
    );
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    const locations = await Location.all({
      session: session,
    });
    res.status(200).send(locations);
  });

  app.post("/product_delete", verifyRequest(app), async (req, res) => {
    console.log(req.body);
    const session = await Shopify.Utils.loadCurrentSession(req, res);

    res.status(200).send("hsy");
  });

  app.post("/graphql", verifyRequest(app), async (req, res) => {
    try {
      const response = await Shopify.Utils.graphqlProxy(req, res);
      res.status(200).send(response.body);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.use(express.json());

  app.use((req, res, next) => {
    const shop = req.query.shop;
    if (Shopify.Context.IS_EMBEDDED_APP && shop) {
      res.setHeader(
        "Content-Security-Policy",
        `frame-ancestors https://${shop} https://admin.shopify.com;`
      );
    } else {
      res.setHeader("Content-Security-Policy", `frame-ancestors 'none';`);
    }
    next();
  });

  app.use("/*", async (req, res, next) => {
    const { shop } = req.query;
    console.log(" ################### SHOP  ################### ");
    console.log(shop);
    console.log(shop === undefined);
    console.log(" ################### SHOP  ################### ");
    const checkShop = await AppSession.exists({ shop: shop });
    console.log(" ################### checkShop  ################### ");
    console.log(checkShop);
    console.log(" ################### checkShop  ################### ");
    console.log(" ################### !checkShop  ################### ");
    console.log(!checkShop);
    console.log(" ################### !checkShop  ################### ");
    if (!checkShop && shop !== undefined) {
      res.redirect(`/auth?shop=${shop}`);
    } else {
      next();
    }
  });

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;
  if (!isProd) {
    vite = await import("vite").then(({ createServer }) =>
      createServer({
        root,
        logLevel: isTest ? "error" : "info",
        server: {
          port: PORT,
          hmr: {
            protocol: "ws",
            host: "localhost",
            port: 64999,
            clientPort: 64999,
          },
          middlewareMode: "html",
        },
      })
    );
    app.use(vite.middlewares);
  } else {
    const compression = await import("compression").then(
      ({ default: fn }) => fn
    );
    const serveStatic = await import("serve-static").then(
      ({ default: fn }) => fn
    );
    const fs = await import("fs");
    app.use(compression());
    app.use(serveStatic(resolve("dist/client")));
    app.use("/*", (req, res, next) => {
      // Client-side routing will pick up on the correct route to render, so we always render the index here
      res
        .status(200)
        .set("Content-Type", "text/html")
        .send(fs.readFileSync(`${process.cwd()}/dist/client/index.html`));
    });
  }

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) => app.listen(PORT));
}
