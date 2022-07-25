import Shopify from "@shopify/shopify-api";
import { Session } from "@shopify/shopify-api/dist/auth/session/index.js";
import AppSession from "./models/AppSessionModel.js";

export async function storeCallback(session) {
  try {
    //   console.log("Running storeCallback");
    const payload = { ...session };
    //   console.log("StoreCallback session===============================");
    // console.log(session);

    const check = await AppSession.exists({ id: session.shop });
    if (check) {
      const update = await AppSession.updateOne(
        { id: session.shop },
        {
          state: session.state,
          isOnline: session.isOnline,
          scope: session.scope,
          expires: session.expires,
          accessToken: session.accessToken,
          onlineAccessInfo: session.onlineAccessInfo,
        }
      );
    } else if (!check) {
      const mynewsession = AppSession({
        id: session.id,
        shop: session.shop,
        state: payload.state,
        isOnline: payload.isOnline,
        scope: payload.scope,
        expires: payload.expires,
        accessToken: payload.accessToken,
        onlineAccessInfo: payload.onlineAccessInfo,
      });
      await mynewsession.save();
    }

    return true;
  } catch (err) {
    console.log("\nERROR on storeCallback\n");
    console.log(err);
    return false;
  }
}
export async function loadCallback(session) {
  try {
    //console.log("loadCallback mysession===============================");
    console.log(session);
    const data = await AppSession.findOne({ id: session }).exec();
    //console.log("DATA FROM loadCallback\n\n");
    //console.log(data);
    if (!data) {
      console.log("returning undefined inside loadCallback");
      return undefined;
    }

    const newsession = new Session(data.id);
    const {
      shop,
      state,
      scope,
      accessToken,
      isOnline,
      expires,
      onlineAccessInfo,
    } = data;
    newsession.shop = shop;
    newsession.state = state;
    newsession.scope = scope;
    newsession.expires = expires ? new Date(expires) : undefined;
    newsession.isOnline = true;
    newsession.accessToken = accessToken;
    newsession.onlineAccessInfo = onlineAccessInfo;

    /*console.log(
      "loadCallback New newsession Complete==============================="
    );
    console.log(newsession);*/
    return newsession;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export async function deleteCallback(id) {
  try {
    //console.log("deleteCallback mysession===============================");
    //console.log(id);
    const check = await AppSession.deleteOne({ id: id }).exec();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
