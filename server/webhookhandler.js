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
      console.log(shop);
      const id = body.id.toString();
      const check = await Products.exists({ store_id: shop, product_id: id });
      console.log(
        "################################################ create",
        check
      );
      if (check) {
        console.log("Product already exists!");
      } else {
        var newProduct = Products();
        newProduct.product_id = body.id;
        newProduct.name = body.title;
        newProduct.store_id = shop;
        newProduct.product_type = body.product_type;
        newProduct.image =
          body.images && body.images.length ? body.images[0].src : null;
        await newProduct.save(function (err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log("Added product");
          }
        });
      }
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
      const id = body.id.toString();
      const check = await Products.exists({ store_id: shop, product_id: id });
      if (check) {
        console.log(
          "################################################# delete",
          id
        );
        const deleted = await Products.deleteOne({
          store_id: shop,
          product_id: id,
        });
        console.log("Deleted product Successfully");
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
