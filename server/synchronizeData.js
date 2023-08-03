import Products from "./models/productModel.js";
import shopsearch from "shopify-api-node";
// import { Shopify } from "@shopify/shopify-api";
import { handleAllWebhooks } from "./webhookshandle.js";
// import { SaveAndUpdateProduct } from "./metafieldHandler.js";

export async function synchronizeData(session) {
  // const { Product } = await import(
  //   `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
  // );
  const shopify = new shopsearch({
    shopName: session.shop,
    accessToken: session.accessToken,
    autoLimit: true,
  });
  let params = { limit: 250 };
  do {
    try {
      const newProducts = await shopify.product.list(params);
      await newProducts.forEach(async (prod) => {
        const checkExist = Products.findOne({
          store_id: session.shop,
          productId: prod.id,
        });
        if (checkExist) {
          // handle updating products if exist
          const variantsIDS = [];
          if (prod?.variants?.length > 0) {
            prod.variants.forEach((variant) => {
              if (variant.title !== "Default Title") {
                variantsIDS.push(variant.id);
              }
            });
          }
          const update = {
            name: prod.title,
            product_type: prod.product_type ? prod.product_type : null,
            image:
              prod?.images && prod?.images?.length > 0
                ? prod?.images[0]?.src
                : null,
            product_variants_ids: variantsIDS,
          };
          Products.findOneAndUpdate(
            { store_id: session.shop, productId: prod.id },
            update,
            (err, res) => {
              if (err) console.log("product synchronizeData update err!!");
              else console.log("product update synchronized successfully!!");
            }
          );
          if (variantsIDS.length > 0) {
            prod.variants.forEach(async (variant) => {
              if (variant.title !== "Default Title") {
                handleUpdateCreateVariant(prod, session, variant);
              }
            });
          }
        } else {
          // handle creation of products
          const variantsIDS = [];
          if (prod?.variants?.length > 0) {
            prod.variants.forEach((variant) => {
              if (variant.title !== "Default Title") {
                variantsIDS.push(variant.id);
              }
            });
          }
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
          if (variantsIDS.length > 0) {
            prod.variants.forEach(async (variant) => {
              if (variant.title !== "Default Title") {
                handleUpdateCreateVariant(prod, session, variant);
              }
            });
          }
        }
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      params = newProducts.nextPageParameters;
    } catch (err) {
      console.log(err);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  } while (params !== undefined);
  // SaveAndUpdateProduct(
  //   products_id,
  //   metafieldsProduct,
  //   session.shop,
  //   session.accessToken
  // );
}

// handle updating and creating variants
const handleUpdateCreateVariant = async (prod, session, variant) => {
  const checkVariantExist = Products.findOne({
    store_id: session.shop,
    productId: variant.id,
  });
  let image;
  for (var i = 0; i < prod.images.length; i++) {
    if (variant.image_id === prod.images[i].id) {
      image = prod.images[i].src;
      break;
    }
  }
  if (checkVariantExist) {
    const updateVariant = {
      name: prod.title + ": " + variant.title,
      product_type: prod.product_type ? prod.product_type : null,
      image: image,
    };
    const update = Products.findOneAndUpdate(
      { store_id: session.shop, productId: variant.id },
      updateVariant,
      (err, res) => {
        if (err) console.log("variant synchronizeData update err!!");
        else console.log("variant update synchronized successfully!!");
      }
    );
  } else {
    const newVariantProd = Products();
    const prodID = variant.id;
    newVariantProd.productId = prodID;
    newVariantProd.name = prod.title + ": " + variant.title;
    newVariantProd.store_id = session.shop;
    newVariantProd.product_type = prod.product_type ? prod.product_type : null;
    newVariantProd.it_is_variant = true;
    newVariantProd.connected_productId_ifVariant = prod.id.toString();
    await newVariantProd.save(function (err, data) {
      if (err) console.log(err);
      else {
        console.log("Added newVariant synchronizeData!");
      }
    });
  }
};
