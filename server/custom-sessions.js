import Shopify from "@shopify/shopify-api";
import { Session } from "@shopify/shopify-api/dist/auth/session/index.js";
import AppSession from "./models/AppSessionModel.js";
import StoreModel from "./models/storeModel.js";

export async function storeCallback(session) {
  try {
    const payload = { ...session };
    const check = await AppSession.exists({ id: session.id });
    const checkExistingStoresDataBase = await StoreModel.exists({
      shop_id: session.shop,
    });
    if (check) {
      const update = await AppSession.updateOne(
        { id: session.id },
        {
          state: session.state,
          isOnline: session.isOnline,
          scope: session.scope,
          expires: session.expires,
          accessToken: session.accessToken,
          onlineAccessInfo: session.onlineAccessInfo,
        }
      );
    }
    if (!check) {
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
      if (!checkExistingStoresDataBase) {
        let store = new StoreModel({
          shop_id: session.shop,
          shop_plan: "Basic",
        });
        await store.save();
      }
    }

    return true;
  } catch (err) {
    console.log("\n ERROR on storeCallback \n");
    console.log(err);
    return false;
  }
}

export async function loadCallback(session) {
  try {
    const data = await AppSession.findOne({ id: session }).exec();
    if (!data) {
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
    return newsession;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export async function deleteCallback(id) {
  try {
    const check = await AppSession.deleteOne({ id: id }).exec();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
