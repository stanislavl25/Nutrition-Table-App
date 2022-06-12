// @ts-check
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
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
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
    } catch (err) {
      res.status(500).send(err);
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
      for (var i = 0; i < storeProducts.length; i++) {
        checkProductsExist(storeProducts[i], shop.shop_id);
      }
      res.status(200).send(shop);
    } catch (err) {
      res.status(400).send("Something wrong happend");
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

  /***
   * get all products with the same shop_id
   */
  app.get("/products-list", verifyRequest(app), async (req, res) => {
    console.log("get products");
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);
    const products = await Products.find({ store_id: session.shop }).lean();
    res.status(200).send(products);
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
    const check = await Products.exists({ productId: product.id });
    if (check === null) {
      const productCreation = await Products.create({
        name: product.title,
        store_id: shopId,
        productId: product.id,
        images: product.images,
        product_type: product.product_type,
      });
    }
  };

  /**return the locations object */

  app.get("/locations", verifyRequest(app), async (req, res) => {
    const { Location } = await import(
      "@shopify/shopify-api/dist/rest-resources/2022-04/index.js"
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
    const shop = req.query.shop;

    // Detect whether we need to reinstall the app, any request from Shopify will
    // include a shop in the query parameters.
    if (app.get("active-shopify-shops")[shop] === undefined && shop) {
      res.redirect(`/auth?shop=${shop}`);
      const check = await StoreModel.findOne({ shop_id: shop }).exec();
      if (check) {
        //do nothing
        // console.log(check);
      } else {
        let store = new StoreModel({ shop_id: shop });
        await store.save();
        // console.log("check false");
      }
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
