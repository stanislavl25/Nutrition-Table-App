import { Shopify } from "@shopify/shopify-api";
import Products from "../models/productModel.js";
import Stores from "../models/storeModel.js";
import topLevelAuthRedirect from "../helpers/top-level-auth-redirect.js";
import { gdprTopics } from "@shopify/shopify-api/dist/webhooks/registry.js";
export default function applyAuthMiddleware(app) {
  app.get("/auth", async (req, res) => {
    if (!req.signedCookies[app.get("top-level-oauth-cookie")]) {
      return res.redirect(`/auth/toplevel?${new URLSearchParams(req.query).toString()}`);
    }
    const redirectUrl = await Shopify.Auth.beginAuth(
      req,
      res,
      req.query.shop,
      "/auth/callback",
      app.get("use-online-tokens")
    );
    res.redirect(redirectUrl);
  });

  app.get("/auth/toplevel", (req, res) => {
    res.cookie(app.get("top-level-oauth-cookie"), "1", {
      signed: true,
      httpOnly: true,
      sameSite: "strict",
    });
    res.set("Content-Type", "text/html");

    res.send(
      topLevelAuthRedirect({
        apiKey: Shopify.Context.API_KEY,
        hostName: Shopify.Context.HOST_NAME,
        host: req.query.host,
        query: req.query,
      })
    );
  });
  app.get("/auth/callback", async (req, res) => {
    try {
      const session = await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query
      );

      const host = req.query.host;
      app.set(
        "active-shopify-shops",
        Object.assign(app.get("active-shopify-shops"), {
          [session.shop]: session.scope,
        })
      );

      const AuthenticatedShop = session.shop;
      const checkNewShop = await Stores.exists({ shop_id: AuthenticatedShop });
      if (!checkNewShop) {
        var newShop = Stores();
        newShop.shop_id = AuthenticatedShop;
        newShop.shop_plan = "Basic";
        await newShop.save(function (err, data) {
          if (err) console.error(err);
          else console.log("Added new Store");
        });
        const { Product } = await import(
          `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
        );
        const newProducts = await Product.all({
          session: session,
          fields: "id,title,product_type,images",
        });
        newProducts.forEach(async (prod) => {
          var newProduct = Products();
          newProduct.productId = prod.id;
          newProduct.name = prod.title;
          newProduct.store_id = session.shop;
          newProduct.product_type = prod.product_type
            ? prod.product_type
            : null;
          newProduct.image =
            prod.images && prod.images.length ? prod.images[0].src : null;
          await newProduct.save(function (err, data) {
            if (err) console.log(err);
            else console.log("Added product");
          });
        });
      } else {
        console.log("known shop");
      }

      const shop=session.shop;
      const accessToken=session.accessToken;
      const webhookRegister = await Shopify.Webhooks.Registry.registerAll({
        shop,
        accessToken,
      });
      Object.entries(webhookRegister).map(([topic, response]) => {
        if (!response.success && !gdprTopics.includes(topic)) {
          console.error(
            `--> Failed to register ${topic} for ${shop}.`,
            response.result.errors[0].message
          );
        } else if (!gdprTopics.includes(topic)) {
          console.log(`--> Registered ${topic} for ${shop}`);
        }
      });

      // Redirect to app with shop parameter upon auth
      res.redirect(`/?shop=${session.shop}&host=${host}`);
    } catch (e) {
      switch (true) {
        case e instanceof Shopify.Errors.InvalidOAuthError:
          res.status(400);
          res.send(e.message);
          break;
        case e instanceof Shopify.Errors.CookieNotFound:
        case e instanceof Shopify.Errors.SessionNotFound:
          // This is likely because the OAuth session cookie expired before the merchant approved the request
          res.redirect(`/auth?shop=${req.query.shop}`);
          break;
        default:
          res.status(500);
          res.send(e.message);
          break;
      }
    }
  });
}

