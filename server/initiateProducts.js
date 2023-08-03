import Products from "./models/productModel.js";
import shopsearch from "shopify-api-node";
// import { SaveAndUpdateProduct } from "./metafieldHandler.js";
export async function initiateProducts(session) {
  try {
    const shopify = new shopsearch({
      shopName: session.shop,
      accessToken: session.accessToken,
      autoLimit: true,
    });
    let params = { limit: 250 };
    do {
      try {
        // let metafieldsProduct=[];
        // let products_id=[];
        const newProducts = await shopify.product.list(params);
        var bulk = Products.collection.initializeUnorderedBulkOp();
        await newProducts.forEach(async (prod) => {
          var newProduct = Products();
          newProduct.productId = prod.id.toString();
          newProduct.store_id = session.shop;
          newProduct.name = prod.title;
          newProduct.product_type = prod.product_type
            ? prod.product_type
            : null;
          newProduct.image =
            prod?.images && prod?.images?.length > 0
              ? prod?.images[0]?.src
              : null;

          const variantsIDS = [];
          if (prod?.variants?.length > 0) {
            prod.variants.forEach((variant) => {
              if (variant.title !== "Default Title") {
                var newVariant = Products();
                const prodID = variant.id.toString();
                variantsIDS.push(prodID);
                newVariant.productId = prodID;
                newVariant.name = prod.title + " " + `(${variant.title})`;
                newVariant.store_id = session.shop;
                newVariant.product_type = prod?.product_type
                  ? prod.product_type
                  : null;
                newVariant.it_is_variant = true;
                newVariant.connected_productId_ifVariant = prod.id.toString();
                if (prod?.images?.length) {
                  for (var i = 0; i < prod.images.length; i++) {
                    if (variant?.image_id === prod?.images[i]?.id) {
                      newVariant.image = prod.images[i].src;
                      break;
                    }
                  }
                }
                bulk.insert(newVariant);
              }
            });
          }
          newProduct.product_variants_ids = variantsIDS;
          // products_id.push(newProduct.product_id);
          // metafieldsProduct.push({
          //   variants: variants,
          //   showLowestPriceBoxValue: false,
          //   showProductSaleStatus: false,
          //   selectadditShowPercentage: "always",
          //   templatePresence: [],
          //   Period: 30
          // })
          bulk.insert(newProduct);
        });
        await bulk.execute();
        // await SaveAndUpdateProduct(products_id, metafieldsProduct, session.shop, session.accessToken);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        params = newProducts.nextPageParameters;
      } catch (err) {
        console.log(err);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } while (params !== undefined);

    console.log("finished adding all products");
  } catch (e) {
    console.log(e);
  }
}
