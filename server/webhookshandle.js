import Products from "./models/productModel.js";
import Stores from "./models/storeModel.js";
import AppSession from "./models/AppSessionModel.js";
import saveProducts_variants from "./middleware/saveProducts_variants.js";
export async function handleAllWebhooks(shop, topic, body) {
  switch (topic) {
    case "PRODUCTS_UPDATE":
      await handleProductsUpdateHook(shop, body);
      break;
    case "PRODUCTS_CREATE":
      await handleProductsCreateHook(shop, body);
      break;
    case "PRODUCTS_DELETE":
      await handleProductsDeletionHook(shop, body);
      break;
    case "shop/redact":
      await handleAppDeletionHook(shop, body);
      break;
    case "APP_UNINSTALLED":
      await AppSession.deleteMany({ shop: shop });
      break;
  }
}

async function handleProductsUpdateHook(shop, body) {
  await saveProducts_variants(shop, body);
}

async function handleProductsCreateHook(shop, body) {
  try {
    if (shop && body) {
      await saveProducts_variants(shop, body);
    } else {
      console.log("shop: " + shop + " does not exist in the DB");
    }
  } catch (e) {
    console.log("error at handleProductsCreateHook");
    console.log(e);
  }
}

async function handleProductsDeletionHook(shop, body) {
  try {
    if (shop && body) {
      if (
        await Products.exists({
          productId: body.id.toString(),
          store_id: shop,
        })
      ) {
        await Products.findOneAndRemove({
          productId: body.id,
          store_id: shop,
        }).then(function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log("Deleted product Successfully", result);
          }
        });
      } else {
        console.log("product already deleted");
      }
    } else {
      console.log("shop: " + shop + " does not exist in the DB");
    }
  } catch (e) {
    console.log("error at handleProductsDeletionHook");
    console.log(e);
  }
}

async function handleAppDeletionHook(shop, body) {
  try {
    if (shop && body) {
      if (await Stores.exists({ shop_id: shop })) {
        const deleted = await Stores.deleteOne({ shop_id: shop });
        await Products.deleteMany({ store_id: { $eq: shop } });
        const deleteAppSession = await AppSession.deleteOne({ shop: shop });
        console.log("Deleted Store Successfully");
      } else {
        console.log("Store Already Deleted");
      }
    } else {
      console.log("shop: " + shop + " does not exist in the DB");
    }
  } catch (e) {
    console.log("error at handleProductsDeletionHook");
    console.log(e);
  }
}
