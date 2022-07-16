import Products from "./models/productModel.js";
import Stores from "./models/storeModel.js";

export async function handleAllWebhooks(shop, topic, body) {
  switch (topic) {
    case "products/update":
      await handleProductsUpdateHook(shop, body);
      break;
    case "products/create":
      await handleProductsCreateHook(shop, body);
      break;
    case "products/delete":
      await handleProductsDeletionHook(shop, body);
      break;
    case "app/uninstalled":
      await handleAppDeletionHook(shop, body);
      break;
  }
}
async function handleProductsUpdateHook(shop, body) {
  console.log(body);

  //   try {
  //     var newPricesArray = [];
  //     if (shop && body) {
  //       const res = await Products.find({
  //         store_id: shop,
  //         product_id: body.id,
  //       }).exec();
  //       if (res) {
  //         var result = res[0];
  //         result = JSON.parse(JSON.stringify(result));
  //         var pricesArray = result.pricesArray.sort(function sortingPrices(a, b) {
  //           if (parseInt(Object.keys(a)[0]) > parseInt(Object.keys(b)[0]))
  //             return 1;
  //           else return -1;
  //         });
  //         var minPrice = body.variants[0]["price"];
  //         if (
  //           pricesArray.length > 0 &&
  //           parseInt(body.variants[0]["price"]) !==
  //             parseInt(
  //               pricesArray[pricesArray.length - 1][
  //                 Object.keys(pricesArray[pricesArray.length - 1])[0]
  //               ]
  //             )
  //         ) {
  //           var datenow = Date.now();
  //           for (var i = 0; i < pricesArray.length; i++) {
  //             if (
  //               (datenow - parseInt(Object.keys(pricesArray[i])[0])) / 86400000 <
  //               180
  //             ) {
  //               if (
  //                 (datenow - parseInt(Object.keys(pricesArray[i])[0])) /
  //                   86400000 <
  //                 parseInt(result.Period)
  //               ) {
  //                 if (
  //                   parseInt(minPrice) >
  //                   parseInt(pricesArray[i][Object.keys(pricesArray[i])[0]])
  //                 ) {
  //                   minPrice = parseInt(
  //                     pricesArray[i][Object.keys(pricesArray[i])[0]]
  //                   ).toString();
  //                 }
  //               }
  //               newPricesArray.push(pricesArray[i]);
  //             }
  //           }
  //           datenow = datenow.toString();
  //           var tempData = {};
  //           tempData[datenow] = body.variants[0]["price"].toString();
  //           newPricesArray.push(tempData);
  //         }
  //         const update = await Products.updateMany(
  //           { store_id: shop, product_id: body.id },
  //           {
  //             $set: {
  //               name: body.title,
  //               current_price: body.variants[0]["price"],
  //               compare_price: body.variants[0]["compare_at_price"],
  //               product_type: body.product_type,
  //               lowest_price_x_days: minPrice,
  //               pricesArray:
  //                 newPricesArray.length > 0 ? newPricesArray : res[0].pricesArray,
  //             },
  //           },
  //           { multi: true }
  //         );
  //         if (update) {
  //           console.log("Successfully updated product");
  //         } else {
  //           console.log("Could not update product");
  //         }
  //       } else {
  //         console.log("could not find product");
  //       }
  //     } else {
  //       console.log("shop: " + shop + " does not exist in the DB");
  //     }
  //   } catch (e) {
  //     console.log("error at handleProductsUpdateHook");
  //     console.log(e);
  //   }
}

async function handleProductsCreateHook(shop, body) {
  try {
    if (shop && body) {
      if (await Products.exists({ store_id: shop, product_id: body.id })) {
        console.log("Product already exists!");
      } else {
        const datenow = Date.now().toString();
        var tempData = {};
        tempData[datenow] = body.variants[0].price.toString();
        var newProduct = Products();
        newProduct.product_id = body.id;
        newProduct.name = body.title;
        newProduct.store_id = shop;
        newProduct.current_price = body.variants[0].price;
        newProduct.pricesArray = [tempData];
        newProduct.compare_price = body.variants[0].compare_at_price;
        newProduct.lowest_price_x_days = body.variants[0].price;
        newProduct.product_type = body.product_type;
        newProduct.images = body.images;
        newProduct.showLowestPriceBoxValue = false;
        newProduct.showProductSaleStatus = false;
        newProduct.ignoreSubsequentDiscounts = false;
        newProduct.selectadditShowPercentage = "always";
        newProduct.Period = 30;
        newProduct.templatePresence = [];
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
      if (await Products.exists({ store_id: shop, product_id: body.id })) {
        const deleted = await Products.deleteOne({
          store_id: shop,
          product_id: body.id,
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
