import { resolve } from "path";
import express from "express";
import cookieParser from "cookie-parser";
import { Shopify, ApiVersion } from "@shopify/shopify-api";
import "dotenv/config";
import applyAuthMiddleware from "./middleware/auth.js";
import verifyRequest from "./middleware/verify-request.js";
import db from "./db.js";
import StoreModel from "./models/storeModel.js";
import Products from "./models/productModel.js";
import AppSession from "./models/AppSessionModel.js";
import { handleAllWebhooks } from "./webhookhandler.js";
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

Shopify.Webhooks.Registry.addHandlers({
  APP_UNINSTALLED: {
    path: "/webhooks",
    webhookHandler: async (topic, shop, body) => {
      // delete ACTIVE_SHOPIFY_SHOPS[shop];
      //sessionStorage.deleteActiveShop(shop);
      console.log("APP_UNINSTALLED WEBHOOK HANDLER TRIGGERED");
    },
  },
  PRODUCTS_UPDATE: {
    path: "/webhooks",
    webhookHandler: async (topic, shop, body) => {
      console.log("PRODUCTS_UPDATE WEBHOOK HANDLER TRIGGERED");
    },
  },
  ORDERS_CREATE: {
    path: "/webhooks",
    webhookHandler: async (topic, shop, body) => {
      console.log("ORDERS_CREATE WEBHOOK HANDLER TRIGGERED");
    },
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
      const topic = req.headers["x-shopify-topic"];
      console.log(topic);
      const shop = req.headers["x-shopify-shop-domain"];
      await handleAllWebhooks(shop, topic, req.body);
      const a = await Shopify.Webhooks.Registry.process(req, res);
      console.log(a);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
      res.status(500).send(error.message);
    }
  });

  app.post("/test", async (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: "RJAA3" });
  });

  /** handle food products save */
  app.post("/save_foodProducts", verifyRequest(app), async (req, res) => {
    const updates = req.body.data;
    updates["edited"] = true;
    try {
      const update = Products.findByIdAndUpdate(
        { _id: req.body.id },
        updates,
        (err, docs) => {
          if (err) {
            console.log("######### error", err);
            res
              .status(400)
              .send({ message: "Something wrong happend!", success: false });
          } else {
            console.log("######### success");
            res.status(200).send({ message: "updates saved!", success: true });
          }
        }
      );
    } catch (e) {
      res
        .status(400)
        .send({ message: "Something wrong happend!", success: false });
    }
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

  app.get("/store-data", verifyRequest(app), async (req, res) => {
    console.log("get store data");
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);
    try {
      const shop = await checkShopExist(session.shop);
      res
        .status(200)
        .send({ data: shop, success: true, message: "shop data back!" });
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
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);
    try {
      const update = await StoreModel.findOneAndUpdate(
        {
          shop_id: session.shop,
        },
        {
          recommendedIntake: req.body.formVal,
        }
      );
      res.status(200).send({ message: "Recommended Intake updated!" });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "something wrong happened" });
    }
  });

  app.post("/products_liveTheme", async (req, res) => {
    console.log("live theme#########", req.body.id);
    try {
      const id = req.body.id;
      console.log(id);
      const query = Products.find({
        productId: id,
        food_product: true,
        edited: true,
      }).select("-productId -is_deleted -_id -createdAt -updatedAt");
      const productsDatabase = await query.exec();
      const storeQuery = StoreModel.find({
        store_id: productsDatabase.store_id,
      }).select("-shop_id -_id -createdAt -updatedAt");
      const storeData = await storeQuery.exec();
      res.status(200).send({
        data: productsDatabase,
        message: "found products!",
        success: true,
        shopData: storeData,
      });
    } catch (err) {
      res.status(400).send({ success: false, message: "no products found!" });
    }
  });

  /***
   * get all products with the same shop_id
   */
  app.get("/products-list", verifyRequest(app), async (req, res) => {
    try {
      const session = await Shopify.Utils.loadCurrentSession(req, res, true);
      const query = Products.find({
        store_id: session.shop,
      }).select("-store_id -productId -is_deleted");
      const productsDatabase = await query.exec();
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
    const check = await StoreModel.findOne(
      { shop_id: storeId },
      "-_id -shop_id"
    ).exec();
    const data = check;
    if (check) return data;
    else return false;
  };

  // /** check if the products exist */
  // const checkProductsExist = async (product, shopId) => {
  //   const check = await Products.find({ productId: product.id });
  //   try {
  //     /** check if product has an updated name or image and update according to those */
  //     if (check) {
  //       if (product.images.length > 0) {
  //         if (
  //           check.length > 0 &&
  //           check[0].image === null &&
  //           check[0].image !== product.images[0].src
  //         ) {
  //           const update = await Products.findOneAndUpdate(
  //             { productId: product.id },
  //             { image: product.images[0].src },
  //             { returnOriginal: false }
  //           );
  //         }
  //       }
  //       if (
  //         !product.images.length > 0 &&
  //         check.length > 0 &&
  //         check[0].image !== null
  //       ) {
  //         const update = await Products.findOneAndUpdate(
  //           { productId: product.id },
  //           { image: null },
  //           { returnOriginal: false }
  //         );
  //       }
  //       if (check.length > 0 && check[0].name !== product.title) {
  //         const update = await Products.findOneAndUpdate(
  //           { productId: product.id },
  //           { name: product.title },
  //           { returnOriginal: false }
  //         );
  //       }
  //     }
  //     if (!check.length) {
  //       const productCreation = await Products.create({
  //         name: product.title,
  //         store_id: shopId,
  //         productId: product.id,
  //         image: product.images.length ? product.images[0].src : null,
  //         product_type: product.product_type,
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  app.post("/recurring-subscribtion", verifyRequest(app), async (req, res) => {
    const plan = req.body.planType;
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);
    const store = session.shop;
    // const accessToken = await AppSession.findOne({ shop: store })
    //   .select("accessToken -_id")
    //   .exec();
    let plan_price;
    if (plan === "Basic") {
      plan_price = 10;
      try {
        const data = await StoreModel.findOneAndUpdate(
          { shop_id: store },
          { shop_plan: plan }
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (plan === "Advanced") {
      plan_price = 25;
      try {
        const data = await StoreModel.findOneAndUpdate(
          { shop_id: store },
          { shop_plan: plan }
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (plan === "Entreprise") {
      plan_price = 100;
      try {
        const data = await StoreModel.findOneAndUpdate(
          { shop_id: store },
          { shop_plan: plan }
        );
      } catch (err) {
        console.log(err);
      }
    }
    // console.log(plan_price);
    //     const client = new Shopify.Clients.Graphql(store, accessToken.accessToken);
    //     const data = await client.query({
    //    data: {
    //     "query": `mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL! ){
    //       appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems) {
    //         userErrors {
    //           field
    //           message
    //         }
    //         appSubscription {
    //           id
    //         }
    //         confirmationUrl
    //       }
    //     }`,
    //     "variables": {
    //       "name": `${plan} Plan`,
    //       "returnUrl": "http://appName.shopifyapps.com/",
    //       "lineItems": [
    //         {
    //           "plan": {
    //             "appRecurringPricingDetails": {
    //               "price": {
    //                 "amount": plan_price,
    //                 "currencyCode": "USD"
    //               },
    //               "interval": "EVERY_30_DAYS"
    //             }
    //           }
    //         }
    //       ]
    //     },
    //   },
    // });
    res.status(200).send({
      success: true,
      message: "Plan updated successfully!",
    });
  });

  /*update store location */

  const updateStoreLocation = (storeId, location) => {
    const update = StoreModel.findOneAndUpdate(
      { shop_id: storeId },
      {
        location: location,
      },
      (err, docs) => {
        if (err) {
          console.log("err", err);
          return false;
        } else {
          console.log("location updated successfully!");
          return true;
        }
      }
    );
  };

  /**return the locations object */

  app.get("/locations", verifyRequest(app), async (req, res) => {
    try {
      const { Location } = await import(
        `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
      );
      const session = await Shopify.Utils.loadCurrentSession(req, res);
      console.log("###############", session.shop);
      const locations = await Location.all({
        session: session,
      });
      let location;
      if (locations.length > 0) {
        const countryCode = locations[0].country_code;
        if (countryCode.includes("US") || countryCode.includes("UM")) {
          location = "NA";
        }
        if (countryCode.includes("CA")) {
          location = "CA";
        } else {
          location = "EU";
        }
      } else {
        res.status(200).send({ location: "EU" });
        updateStoreLocation(session.shop, "EU");
      }
      res.status(200).send({ location: location });
      updateStoreLocation(session.shop, location);
    } catch (err) {
      res
        .status(400)
        .send({ success: false, message: "Something wrong happend!" });
    }
  });

  app.post("/product_Hide", verifyRequest(app), async (req, res) => {
    console.log("product hide! ########################");
    const update = Products.findOneAndUpdate(
      { _id: req.body.productId },
      {
        food_product: false,
      },
      (err, docs) => {
        if (err) {
          res
            .status(400)
            .send({ success: false, message: "Something wrong happend!" });
        } else {
          res
            .status(200)
            .send({ success: true, message: "Label updated successfully!" });
        }
      }
    );
  });

  app.post("/product_bulk_Hide", verifyRequest(app), async (req, res) => {
    console.log("product bulk hide! ########################");
    const products = req.body.products;
    try {
      products.forEach(async (elem) => {
        const update = Products.findOneAndUpdate(
          { _id: elem },
          {
            food_product: false,
          },
          (err, docs) => {
            if (err) console.log(err);
          }
        );
      });
      res
        .status(200)
        .send({ success: true, message: "Label updated successfully!" });
    } catch (err) {
      res
        .status(400)
        .send({ success: false, message: "Something wrong happend!" });
    }
  });

  app.post("/product_Reset", verifyRequest(app), async (req, res) => {
    console.log("product reset!");
    try {
      let productData;
      const productToReset = await Products.findOne({
        _id: req.body.productId,
      }).exec();
      productData = productToReset;

      const update = Products.findOneAndDelete(
        { _id: req.body.productId },
        (err, docs) => {
          if (err) {
            console.log(err);
          } else {
            console.log("product Deleted!");
          }
        }
      );
      var newProduct = Products();
      newProduct.productId = productData.productId;
      newProduct.name = productData.name;
      newProduct.store_id = productData.store_id;
      newProduct.product_type = productData.product_type
        ? productData.product_type
        : null;
      newProduct.image =
        productData.image && productData.image.length
          ? productData.image
          : null;
      await newProduct.save(function (err, data) {
        if (err) console.log(err);
        else console.log("Added product!");
      });
      res
        .status(200)
        .send({ success: true, message: "Label reset successfully!" });
    } catch (err) {
      res
        .status(400)
        .send({ success: false, message: "Something wrong happend!" });
    }
  });

  app.post("/product_bulk_Reset", verifyRequest(app), async (req, res) => {
    console.log("product reset bulk!");
    try {
      let productData;
      const productsArray = req.body.products;
      productsArray.forEach(async (elem) => {
        const productToReset = await Products.findOne({
          _id: elem,
        }).exec();
        productData = productToReset;

        const update = Products.findOneAndDelete({ _id: elem }, (err, docs) => {
          if (err) {
            console.log(err);
          } else {
            console.log("product Deleted!");
          }
        });
        var newProduct = Products();
        newProduct.productId = productData.productId;
        newProduct.name = productData.name;
        newProduct.store_id = productData.store_id;
        newProduct.product_type = productData.product_type
          ? productData.product_type
          : null;
        newProduct.image =
          productData.image && productData.image.length
            ? productData.image
            : null;
        await newProduct.save(function (err, data) {
          if (err) console.log(err);
          else console.log("Added product!");
        });
      });
      res
        .status(200)
        .send({ success: true, message: "Labels reset successfully!" });
    } catch (err) {
      res
        .status(400)
        .send({ success: false, message: "Something wrong happend!" });
    }
  });

  app.post("/portionSizeModal", verifyRequest(app), async (req, res) => {
    console.log("portion size modal!");
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    const store = session.shop;
    const update = StoreModel.findOneAndUpdate(
      { shop_id: store },
      { portionSizeModalCheckBox: true },
      (err, docs) => {
        if (err) {
          res
            .status(400)
            .send({ success: false, message: "Something wrong happend!" });
        } else {
          res
            .status(200)
            .send({ success: true, message: "Portion size Modal updated!" });
        }
      }
    );
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
    const checkShop = await AppSession.exists({ shop: shop });
    // Detect whether we need to reinstall the app, any request from Shopify will
    // include a shop in the query parameters.
    if (!checkShop && shop !== undefined) {
      res.redirect(`/auth?shop=${shop}`);
      console.log("index.js", `/auth?shop=${shop}`);
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
