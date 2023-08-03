import { Shopify } from "@shopify/shopify-api";
import "dotenv/config";
import Products from "./models/productModel.js";

export async function SaveAndUpdateProduct(
  updates,
  products,
  shop,
  accessToken
) {
  try {
    const client = new Shopify.Clients.Graphql(shop, accessToken);
    let metafields = [];
    for (var i = 0; i < products.length; i++) {
      //*** handle variants here later */

      // products[i].variants = products[i].variants.map((variant) => ({
      // 	variant_id: variant.variant_id,
      // 	current_price: variant.current_price,
      // 	compare_price: variant.compare_price,
      // 	lowest_price_x_days: variant.lowest_price_x_days }))
      const prod = await Products.findOne({ _id: products[i] });
      metafields.push({
        key: "productInfo",
        namespace: "nutrition_table",
        ownerId: `gid://shopify/Product/${prod.productId}`,
        type: "multi_line_text_field",
        value: JSON.stringify(updates),
      });
    }
    while (metafields.length > 0) {
      let temp = metafields.splice(0, 24);
      let data;
      while (true) {
        try {
          data = await client.query({
            data: {
              query: `mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
					      metafieldsSet(metafields: $metafields) {
					        userErrors {
					          field
					          message
					          code
					        }
					      }
					    }`,
              variables: {
                metafields: temp,
              },
            },
          });
          console.log(
            data.body.data,
            "processing metafield mutation in SaveAndUpdateProduct!!"
          );
          break;
        } catch (err) {
          // console.log('error at SaveAndUpdateProduct inside loop');
          // console.log(err);
          if (err.toString().includes("401 Unauthorized")) {
            console.log("401 Unauthorized so returning!");
            return;
          }
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  } catch (e) {
    console.log("error at SaveAndUpdateProduct outside loop");
    console.log(e);
  }
}

export async function SaveStoreInfo(data, session) {
  try {
    const { Metafield } = await import(
      `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
    );
    while (true) {
      try {
        delete data._id;
        delete data.id;
        delete data.needsUpdate;
        delete data.shop_id;
        delete data.updatedAt;
        delete data.createdAt;
        const metafield = new Metafield({ session: session });
        metafield.namespace = "nutritionTable_settings";
        metafield.key = "settings";
        metafield.value = JSON.stringify(data);
        metafield.type = "single_line_text_field";
        const res = await metafield.save({
          update: true,
        });
        console.log("metafield saved ###");
        break;
      } catch (err) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  } catch (e) {
    console.log(e, "err at SaveStoreInfo metafileldHandler");
  }
}
