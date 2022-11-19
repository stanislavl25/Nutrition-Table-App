import crypto from "crypto";
import { Shopify } from "@shopify/shopify-api";

const verifyHmac = (req, res, next) => {
  try {
    console.log("started verifying the Hmac of the webhook");
    const generateHash = crypto
      .createHmac("SHA256", Shopify.Context.API_SECRET_KEY)
      .update(JSON.stringify(req.body), "utf8")
      .digest("base64");
    const hmac = req.headers["x-shopify-hmac-sha256"];
    if (Shopify.Utils.safeCompare(generateHash, hmac)) {
      next();
    } else {
      console.log("didn't work")
      return res.status(401).send();
    }
  } catch (e) {
    console.log(e);
    return res.status(401).send();
  }
};

export default verifyHmac;
