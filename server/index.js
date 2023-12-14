import { resolve } from "path";
import express from "express";
import cookieParser from "cookie-parser";
import { Shopify, ApiVersion } from "@shopify/shopify-api";
import "dotenv/config";
import applyAuthMiddleware from "./middleware/auth.js";
import verifyRequest from "./middleware/verify-request.js";
import verifyHmac from "./middleware/verifyHmac.js";
import db from "./db.js";
import StoreModel from "./models/storeModel.js";
import Products from "./models/productModel.js";
import AppSession from "./models/AppSessionModel.js";
import { handleAllWebhooks } from "./webhookshandle.js";
import { synchronizeData } from "./synchronizeData.js";
import { initiateProducts } from "./initiateProducts.js";
import { SaveAndUpdateProduct, SaveStoreInfo } from "./metafieldHandler.js";
import {
  handleProductsPagination,
  getCollections,
  handleProductsPaginationWithFilter,
} from "./paginationHandler.js";
import { launchUpdate, checkNewUpdate } from "./newUpdates.js";
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
  SESSION_STORAGE: new Shopify.Session.MongoDBSessionStorage(
    "mongodb://localhost:27017/",
    "nutritiontable"
  ),
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};

Shopify.Webhooks.Registry.addHandlers({
  APP_UNINSTALLED: {
    path: "/webhooks",
    webhookHandler: async (topic, shop, body) => {
      console.log(topic);
      handleAllWebhooks(shop, topic, JSON.parse(body));
    },
  },
  PRODUCTS_CREATE: {
    path: "/webhooks",
    webhookHandler: async (topic, shop, body) => {
      console.log(topic);
      handleAllWebhooks(shop, topic, JSON.parse(body));
    },
  },
  PRODUCTS_UPDATE: {
    path: "/webhooks",
    webhookHandler: async (topic, shop, body) => {
      console.log(topic);
      handleAllWebhooks(shop, topic, JSON.parse(body));
    },
  },
  PRODUCTS_DELETE: {
    path: "/webhooks",
    webhookHandler: async (topic, shop, body) => {
      console.log(topic);
      handleAllWebhooks(shop, topic, JSON.parse(body));
    },
  },
  THEMES_PUBLISH: {
    path: "/webhooks",
    webhookHandler: async (topic, shop, body) => {
      console.log(topic);
      handleAllWebhooks(shop, topic, JSON.parse(body));
    },
  },
  THEMES_UPDATE: {
    path: "/webhooks",
    webhookHandler: async (topic, shop, body) => {
      console.log(topic);
      handleAllWebhooks(shop, topic, JSON.parse(body));
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
  app.use(cookieParser(Shopify.Context.API_SECRET_KEY));

  applyAuthMiddleware(app);

  app.post("/webhooks", async (req, res) => {
    try {
      await Shopify.Webhooks.Registry.process(req, res);
      res.status(200).end();
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
      if (!res.headersSent) {
        res.status(500).send(error.message);
      }
    }
  });
  app.use(express.json());
  app.post("/gdpr/:GDPRwebhook", verifyHmac, async (req, res) => {
    try {
      const topic = req.headers["x-shopify-topic"];
      const shop = req.headers["x-shopify-shop-domain"];
      console.log("gdpr hmac verified");
      console.log(topic);
      console.log(shop);
      if (topic === "shop/redact") {
        handleAllWebhooks(shop, topic, req.body);
      }
      res.status(200).end();
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
      if (!res.headersSent) {
        res.status(500).send(error.message);
      }
    }
  });
  /** handle food products save */
  app.post("/save_foodProducts", verifyRequest(app), async (req, res) => {
    const updates = req.body.data;
    const products = req.body.products;
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);
    delete updates._id;
    delete updates.name;
    delete updates.product_type;
    delete updates.image;
    delete updates.updatedAt;
    delete updates.createdAt;
    try {
      await SaveAndUpdateProduct(
        updates,
        products,
        session.shop,
        session.accessToken
      );
      updates["edited"] = true;
      products.map(async (elem) => {
        const update = Products.findByIdAndUpdate(
          { _id: elem },
          updates,
          (err, docs) => {
            if (err) {
              console.log("######### error", err);
              res
                .status(400)
                .send({ message: "Something wrong happend!", success: false });
            } else {
              console.log("######### success");
            }
          }
        );
      });
      res.status(200).send({ message: "updates saved!", success: true });
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
    const updates = req.body.data;
    delete updates._id;
    delete updates.name;
    delete updates.product_type;
    delete updates.image;
    delete updates.updatedAt;
    delete updates.createdAt;
    updates.food_product = false;
    try {
      await SaveAndUpdateProduct(
        updates,
        products,
        session.shop,
        session.accessToken
      );
      let updateData;
      for (var i = 0; i < products.length; i++) {
        updateData = await Products.findOneAndUpdate(
          { store_id: storeId, _id: products[i] },
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
    const updates = req.body.updates;
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);
    const store = session.shop;
    delete updates.id;
    delete updates.AlreadySubscribed;
    delete updates.firstTimeOpenApp;
    delete updates.freeTrialDone_Paid;
    delete updates._id;
    delete updates.shop_id;
    try {
      const updateData = await StoreModel.findOneAndUpdate(
        { shop_id: store },
        updates,
        { returnDocument: "after", returnOriginal: false }
      );
      if (updateData) {
        res.status(200).send({
          success: true,
          message: "Changes Saved!",
        });
      }
      await SaveStoreInfo(updateData, session);
    } catch (err) {
      res.status(400).send({ message: "Something wrong happend!" });
      console.log(err, "err at /LangFieldsSave");
    }
  });

  /***
   * handle Language page data response
   */
  app.get("/LangData", verifyRequest(app), async (req, res) => {
    try {
      const session = await Shopify.Utils.loadCurrentSession(req, res, true);
      const store = session.shop;
      const shopData = await StoreModel.find({ shop_id: store }).exec();
      if (shopData) {
        res
          .status(200)
          .send({ success: true, message: "Data Exists", data: shopData });
      } else {
        res.status(200).send({ success: false, message: "Data doesn't exist" });
      }
    } catch (err) {
      console.log(err, "error at /LangData");
      res.status(500).send({ success: false, message: "Data doesn't exist" });
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
      await SaveStoreInfo(shop, session);
      const shopName = session.shop.split(".")[0];
      if (!shop) {
        res.status(200).send({
          data: [],
          success: false,
          message: "shop data back!",
          shopName,
        });
      } else {
        res.status(200).send({
          data: shop,
          success: true,
          message: "shop data back!",
          shopName,
        });
      }
    } catch (err) {
      res.status(400).send({
        data: [],
        success: false,
        message: "shop data back!",
      });
      console.log(err, "error at /store-data");
    }
  });

  /***
   * handle recommended intake save
   */
  app.post("/recommendedIntake_save", verifyRequest(app), async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);
    try {
      const update = await StoreModel.findOneAndUpdate(
        {
          shop_id: session.shop,
        },
        {
          recommendedIntake: req.body.formVal,
        },
        { returnDocument: "after", returnOriginal: false }
      );
      res.status(200).send({
        success: true,
        message: "Recommended Intake updated!",
        data: update,
      });
      await SaveStoreInfo(update, session);
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

  /**
   * check if store have any products (at least one)
   *
   */

  app.get("/check-init-product", verifyRequest(app), async (req, res) => {
    try {
      const session = await Shopify.Utils.loadCurrentSession(req, res, true);
      const hasProducts = await Products.find({
        store_id: session.shop,
      })
        .limit(1)
        .count();
      console.log(
        "checking if store have any registered products",
        hasProducts
      );
      res.status(200).send({
        message: hasProducts,
        success: true,
      });
    } catch (err) {
      console.log(err, "err at /check-init-product");
      res.status(404).send({
        message: "an error has occured",
        success: false,
      });
    }
  });

  /**
   * save all store products in DB
   *
   */

  app.get("/product-initiate", verifyRequest(app), async (req, res) => {
    try {
      console.log("initiating products");
      const session = await Shopify.Utils.loadCurrentSession(req, res, true);
      await initiateProducts(session);
      res.status(200).send({
        message: "Products added successfully",
        success: true,
      });
    } catch (err) {
      console.log(err, "err at /product-initiate");
      res.status(404).send({
        message: "an error has occured",
        success: false,
      });
    }
  });

  /***
   * get all products with the same shop_id
   */

  app.post("/products-list", verifyRequest(app), async (req, res) => {
    try {
      let data;
      console.log("/products-list");
      const session = await Shopify.Utils.loadCurrentSession(req, res, true);
      const collections = await getCollections(session);
      if (
        req.body.filters.query.length > 0 ||
        req.body.filters.collections[0].length > 0
      ) {
        data = await handleProductsPaginationWithFilter(
          session,
          null,
          "",
          req.body.filters
        );
      } else {
        data = await handleProductsPagination("load", null, null, session);
      }
      if (data.synchronisedElements.length) {
        res.status(200).send({
          data: data.synchronisedElements,
          message: "found products!",
          success: true,
          hasPages: data.hasPages,
          shopifyData: {
            firstCursor: data.firstCursor,
            lastCursor: data.lastCursor,
          },
          collections: collections,
        });
      } else {
        res.status(200).send({
          data: [],
          shopifyData: { firstCursor: "", lastCursor: "" },
          success: false,
          hasPages: { hasNextPage: false, hasPreviousPage: false },
          collections: [""],
        });
      }
    } catch (err) {
      console.log("Error at /products-list", err);
      res.status(400).send({
        data: [],
        shopifyData: { firstCursor: "", lastCursor: "" },
        success: false,
        hasPages: { hasNextPage: false, hasPreviousPage: false },
        collections: [""],
        message: "no products found!",
      });
    }
  });

  /** check for app updates **/

  app.get("/check-updates", verifyRequest(app), async (req, res) => {
    try {
      const session = await Shopify.Utils.loadCurrentSession(req, res, true);
      const check = await checkNewUpdate(session.shop);
      res.status(200).send({
        check: check,
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.status(404).send({
        message: "an error has occured",
        success: false,
      });
    }
  });

  /**check if the store exist */
  const checkShopExist = async (storeId) => {
    const check = await StoreModel.findOne(
      { shop_id: storeId },
      "-_id -shop_id -id -createdAt -updatedAt -needsUpdate"
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

  const checkTrialEnd = async (shop_id) => {
    const storeQuery = StoreModel.find({ shop_id: shop_id });
    const store = await storeQuery.exec();
    const shopCreationDate = new Date(store[0].createdAt);
    const freeTrialDone_Paid = store[0].freeTrialDone_Paid;
    if (freeTrialDone_Paid) return "paid";
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - shopCreationDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays >= 1) return false;
    return true;
  };

  app.post("/recurring-subscribtion", verifyRequest(app), async (req, res) => {
    let plan = req.body.planType;
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);
    const store = session.shop;
    const storeQuery = StoreModel.find({ shop_id: store });
    const shopData = await storeQuery.exec();
    const firstTimeOpen = shopData[0]?.firstTimeOpenApp;
    if (plan === undefined && firstTimeOpen) {
      plan = "Basic";
    }
    if (plan === undefined) {
      res.status(200).send({ success: true });
      return;
    }
    try {
      const data = await StoreModel.findOneAndUpdate(
        {
          shop_id: store,
        },
        {
          firstTimeOpenApp: false,
        },
        {
          returnOriginal: false,
        }
      );
    } catch (err) {
      console.log(err);
    }

    let client = new Shopify.Clients.Graphql(store, session.accessToken);
    const { RecurringApplicationCharge, ApplicationCharge, Shop } =
      await import(
        `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
      );

    const current_subscriptions = await RecurringApplicationCharge.all({
      session: session,
    });

    let plan_price;
    if (plan === "Basic") {
      plan_price = 10;
    }
    if (plan === "Advanced") {
      plan_price = 25;
    }
    if (plan === "Enterprise") {
      plan_price = 100;
    }
    const check = await checkTrialEnd(session.shop);
    if (check === "paid") {
      console.log("trial done and plan paid!");
    }
    if (check === true) {
      console.log("your free trial still on!!", check);
      try {
        const data = await StoreModel.findOneAndUpdate(
          {
            shop_id: store,
          },
          {
            AlreadySubscribed: true,
            shop_plan: plan,
          },
          {
            returnOriginal: false,
          }
        );
      } catch (err) {
        console.log(err);
      }
      res.status(200).send({
        success: true,
        message: "Plan updated successfully!",
      });
      return;
    } else if (check === false) {
      console.log("your free trial ended!!");

      const filtered_subscriptions = current_subscriptions.filter(
        (subscription) => subscription.status === "active"
      );

      if (filtered_subscriptions.length > 0) {
        console.log("subscription status is active");
        try {
          const data = await StoreModel.findOneAndUpdate(
            {
              shop_id: store,
            },
            {
              AlreadySubscribed: true,
              shop_plan: plan,
            },
            {
              returnOriginal: false,
            }
          );
        } catch (err) {
          console.log(err);
        }

        if (filtered_subscriptions[0].name !== plan) {
          console.log("active subscription has different plan ");
          const data = await client.query({
            data: {
              query: `mutation AppSubscriptionCancel($id: ID!){
                appSubscriptionCancel(id: $id) {
                  userErrors {
                    field
                    message
                  }
                  appSubscription {
                    id
                    status
                  }
                }
              }`,
              variables: {
                id: `gid://shopify/AppSubscription/${filtered_subscriptions[0].id}`,
              },
            },
          });
          client = new Shopify.Clients.Graphql(store, session.accessToken);
          const createdSubscription = await client.query({
            data: {
              query: `mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!, $test: Boolean ){
              appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, test: $test) {
                userErrors {
                  field
                  message
                }
                appSubscription {
                  id
                }
                confirmationUrl
              }
            }`,
              variables: {
                name: `${plan}`,
                returnUrl: `http://${store}/admin/apps/nutrition_table`,
                test: true,
                lineItems: [
                  {
                    plan: {
                      appRecurringPricingDetails: {
                        price: {
                          amount: plan_price,
                          currencyCode: "USD",
                        },
                        interval: "EVERY_30_DAYS",
                      },
                    },
                  },
                ],
              },
            },
          });
          console.log(
            createdSubscription.body,
            "###############################################"
          );
          res.status(200).send({
            confirmation_url:
              createdSubscription.body.data.appSubscriptionCreate
                .confirmationUrl,
          });
        } else {
          res.status(200).send({});
        }
      } else {
        console.log(
          "subscription status is not active (pending || expired || declined)"
        );
        const AlreadySubscribed = await StoreModel.findOne({
          shop_id: store,
        }).exec();

        if (AlreadySubscribed.AlreadySubscribed) {
          console.log("has been subscribed");

          const createdSubscription = await client.query({
            data: {
              query: `mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!, $test: Boolean ){
            appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, test: $test) {
              userErrors {
                field
                message
              }
              appSubscription {
                id
              }
              confirmationUrl
            }
          }`,
              variables: {
                name: `${plan}`,
                returnUrl: `http://${store}/admin/apps/nutrition_table`,
                test: true,
                lineItems: [
                  {
                    plan: {
                      appRecurringPricingDetails: {
                        price: {
                          amount: plan_price,
                          currencyCode: "USD",
                        },
                        interval: "EVERY_30_DAYS",
                      },
                    },
                  },
                ],
              },
            },
          });
          console.log(
            createdSubscription.body,
            "###############################################"
          );
          res.status(200).send({
            confirmation_url:
              createdSubscription.body.data.appSubscriptionCreate
                .confirmationUrl,
          });
        } else {
          console.log("no previous subscriptions");

          const createdSubscription = await client.query({
            data: {
              query: `mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!, $trialDays: Int, $test: Boolean  ){
            appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, trialDays: $trialDays, test: $test) {
              userErrors {
                field
                message
              }
              appSubscription {
                id
              }
              confirmationUrl
            }
          }`,
              variables: {
                name: `${plan}`,
                returnUrl: `http://${store}/admin/apps/nutrition_table`,
                test: true,
                trialDays: 7,
                lineItems: [
                  {
                    plan: {
                      appRecurringPricingDetails: {
                        price: {
                          amount: plan_price,
                          currencyCode: "USD",
                        },
                        interval: "EVERY_30_DAYS",
                      },
                    },
                  },
                ],
              },
            },
          });
          console.log(
            createdSubscription.body,
            "###############################################"
          );
          res.status(200).send({
            confirmation_url:
              createdSubscription.body.data.appSubscriptionCreate
                .confirmationUrl,
          });
        }
      }
    }
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
      } else if (!locations.length) {
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

  app.post("/handle_nextProducts", verifyRequest(app), async (req, res) => {
    const type = req.body.type;
    const cursor = req.body.cursor;
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);
    let data;
    try {
      if (req?.body?.filters?.query?.length > 0) {
        data = await handleProductsPaginationWithFilter(
          session,
          req.body.type,
          req.body.cursor,
          req.body.filters
        );
      } else {
        data = await handleProductsPagination(type, cursor, null, session);
      }

      if (data.synchronisedElements.length) {
        res.status(200).send({
          success: true,
          data: data.synchronisedElements,
          hasPages: data.hasPages,
          shopifyData: {
            firstCursor: data.firstCursor,
            lastCursor: data.lastCursor,
          },
        });
      } else {
        res.status(200).send({
          data: [],
          shopifyData: { firstCursor: "", lastCursor: "" },
          success: false,
          hasPages: { hasNextPage: false, hasPreviousPage: false },
        });
      }
    } catch (err) {
      console.log("Error at /handle_nextProducts", err);
      res.status(200).send({
        data: [],
        shopifyData: { firstCursor: "", lastCursor: "" },
        success: false,
        hasPages: { hasNextPage: false, hasPreviousPage: false },
      });
    }
  });
  app.post(
    "/handle_previousProducts",
    verifyRequest(app),
    async (req, res) => {}
  );

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
  //***get products count to calculate time for synchronisation process */

  app.get("/product-count", verifyRequest(app), async (req, res) => {
    try {
      const session = await Shopify.Utils.loadCurrentSession(req, res, true);
      const { Product } = await import(
        `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
      );
      let count = await Product.count({
        session: session,
      });
      res.status(200).send({
        count: count.count,
        success: true,
      });
    } catch (err) {
      console.log("error at /product-count", err);
      res.status(404).send({
        count: 0,
        success: false,
      });
    }
  });

  //*** synchronize products */
  app.get("/synchronize-products", verifyRequest(app), async (req, res) => {
    try {
      const session = await Shopify.Utils.loadCurrentSession(req, res, true);
      await synchronizeData(session);
      res.status(200).send({
        message: "products has been synchronized!",
        success: true,
      });
    } catch (err) {
      console.log("Error at /synchronize-products", err);
      res.status(400).send({
        message: "an error has occured",
        success: false,
      });
    }
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
      res.setHeader(
        "Content-Security-Policy",
        `frame-ancestors 'none';default-src 'self'; img-src https://*; child-src 'none';`
      );
    }
    next();
  });

  app.use("/*", async (req, res, next) => {
    const { shop } = req.query;
    const checkShop = await AppSession.find({ id: { $regex: `${shop}_.*` } });
    // Detect whether we need to reinstall the app, any request from Shopify will
    // include a shop in the query parameters.
    if (checkShop.length === 0 && shop !== undefined) {
      res.redirect(`/auth?${new URLSearchParams(req.query).toString()}`);
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

  return {
    app,
    vite,
  };
}

if (!isTest) {
  createServer().then(({ app }) => app.listen(PORT));
}
