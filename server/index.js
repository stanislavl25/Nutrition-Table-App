// @ts-check
import { resolve } from "path";
import express from "express";
import cookieParser from "cookie-parser";
import { Shopify, ApiVersion } from "@shopify/shopify-api";
import "dotenv/config";
import applyAuthMiddleware from "./middleware/auth.js";
import verifyRequest from "./middleware/verify-request.js";
import db from "./db.js";
import Products from "./models/productModel.js";
import CustomFields from "./models/CustomFieldsModel.js";
import StoreModel from "./models/storeModel.js";

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

  /***
   * return list of custom fields for a certain shopify store
   */
  app.get("/costum-fields", verifyRequest(app), async (req, res) => {
    try {
      const fields = await CustomFields.find({});
      // res.status(200).send(all);
      console.log(fields);

      if (fields.length) {
        res.status(200).send({
          success: true,
          message: "all custom fields related to this product",
          data: fields,
        });
      } else {
        res.status(200).send({
          success: false,
          message: "No custom fields related to this product",
        });
      }
    } catch {
      res.status(500).send();
    }
  });

  /**
   * handle product and it's nutritions save / update
   */

  app.post("/nutrition-save", verifyRequest(app), async (req, res) => {
    const reqBody = req.body;
    for (var i = 0; i < reqBody.length; i++) {
      let check = checkExistedProduct(reqBody[i].id);
      if (check) {
        // Todo update Product here using product id
      } else {
        // Todo save product here using store id
      }
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
      if (name === "NutritionInformation") {
        const update = { NutritionInformation: value };
        const updateData = await StoreModel.findOneAndUpdate(
          { shop_id: store },
          update,
          { returnOriginal: false }
        );
        // console.log(updateData);
        res.status(200).send({
          success: true,
          message: "Changes Saved!",
        });
      }
      if (name === "Ingredients") {
        const update = { Ingredients: value };
        const updateData = await StoreModel.findOneAndUpdate(
          { shop_id: store },
          update,
          { returnOriginal: false }
        );
        // console.log(updateData);
        res.status(200).send({
          success: true,
          message: "Changes Saved!",
        });
      }
      if (name === "AllergyInformation") {
        const update = { AllergyInformation: value };
        const updateData = await StoreModel.findOneAndUpdate(
          { shop_id: store },
          update,
          { returnOriginal: false }
        );
        // console.log(updateData);
        res.status(200).send({
          success: true,
          message: "Changes Saved!",
        });
      }
      if (name === "LEGALNOTICE") {
        const update = { LEGALNOTICE: value };
        const updateData = await StoreModel.findOneAndUpdate(
          { shop_id: store },
          update,
          { returnOriginal: false }
        );
        // console.log(updateData);
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
    console.log("data back");
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);
    const store = session.shop;
    // console.log(session.shop);
    const shopData = await StoreModel.find(
      { shop_id: store },
      "NutritionInformation Ingredients AllergyInformation LEGALNOTICE"
    ).exec();
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
   * handle custom fields save / update
   */

  app.post("customFields-save", verifyRequest(app), async (req, res) => {
    const reqBody = req.body;
    for (var i = 0; i < reqBody.length; i++) {
      let check = checkExistedCustomField(reqBody[i].id);
      if (check) {
        //Todo update custom field using product id
      } else {
        //Todo save custom field using product id
      }
    }
  });

  /**
   * returns the list of products on that specific shopify store
   */

  app.get("/products-list", verifyRequest(app), async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);
    const { Product } = await import(
      `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
    );
    const products = await Product.all({
      session,
      fields: "id,title,product_type,images",
    });
    for (var i = 0; i < products.length; i++) {
      delete products[i]["session"];
    }

    // console.log(products);
    res.status(200).send(products);
  });

  /**return the locations object */

  app.get("/locations", verifyRequest(app), async (req, res) => {
    const { Location } = await import(
      "@shopify/shopify-api/dist/rest-resources/2022-04/index.js"
    );
    const test_session = await Shopify.Utils.loadCurrentSession(req, res);
    const locations = await Location.all({
      session: test_session,
    });
    console.log(locations);
    res.status(200).send(locations);
  });

  /**
   *
   * @param {'productId'} itemId
   * check if product exist in database
   */

  const checkExistedProduct = async (itemId) => {
    const item = await Products.exists({ id: itemId }, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Result :", data); // true / false
        return data;
      }
    });
  };

  const checkExistedCustomField = async (itemId) => {
    const customField = await CustomFields.exists(
      { id: itemId },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log("Result :", data); // true / false
          return data;
        }
      }
    );
  };

  const addCustomFields = async (reqBody) => {
    // const title = reqBody.title;
    // const value = reqBody.value;
    const field = new CustomFields({
      id: "2131q3d21qs23dq32sd1",
      properties: {
        weight: 2.3,
        talktime: "8 hours",
        "battery type": "lithium",
      },
    });
    await field.save();
    // const customField = await CustomFields.set(title, value);
  };

  /*
   * add custom fields to every product data
   */

  app.post("/addCustomFields", verifyRequest(app), async (req, res) => {
    addCustomFields(req.body);
  });

  /**
   * test db
   *
   */

  // app.post("/createPlan", verifyRequest(app), async (req, res) => {
  //   const obj1 = req.body;
  //   try {
  //     let plan = new Plans(obj1);
  //     await plan.save();
  //     let response = {
  //       success: true,
  //       message: "Plan created successfully!",
  //     };
  //     res.json(response);
  //     // res.status(200).send(response);
  //   } catch (error) {
  //     let response = {
  //       success: false,
  //       message: "Plan is not created !",
  //       error,
  //     };
  //     console.log(error);
  //     res.json(response);
  //   }
  // });

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
      console.log(shop);
      const check = await StoreModel.findOne({ shop_id: shop }).exec();
      if (check) {
        //do nothing
        // console.log(check);
      } else {
        let store = new StoreModel({ shop_id: shop });
        let storeCreated = await store.save();
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
