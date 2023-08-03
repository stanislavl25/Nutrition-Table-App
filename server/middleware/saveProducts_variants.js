import Products from "../models/productModel.js";
// import { Shopify } from "@shopify/shopify-api";
function search_array(array, valuetofind) {
  if (array !== undefined) {
    for (let i = 0; i < array.length; i++) {
      if (array.includes(valuetofind.toString())) {
        return true;
      }
    }
  }
  return false;
}

//save variant if it does not exist
const saveVariant = async (prod, variants_productsObj, shop) => {
  if (prod.node?.title === "Default Title") return;
  var newProduct = Products();
  const prodID = prod.id;
  newProduct.productId = prodID;
  newProduct.name = variants_productsObj.title + ": " + prod.title;
  newProduct.store_id = shop;
  newProduct.product_type = variants_productsObj.product_type
    ? variants_productsObj.product_type
    : null;
  newProduct.it_is_variant = true;
  newProduct.connected_productId_ifVariant = variants_productsObj.id;
  for (var i = 0; i < variants_productsObj.images.length; i++) {
    if (prod.image_id === variants_productsObj.images[i].id) {
      newProduct.image = variants_productsObj.images[i].src;
      break;
    }
  }
  await newProduct.save(function (err, data) {
    if (err) console.log(err);
    else {
      Products.findOneAndUpdate(
        { productId: variants_productsObj.id },
        { $push: { product_variants_ids: prodID } }
      ).exec();
      console.log("Added variant!");
    }
  });
};

//update variant if exist
const updateVariant = async (prod, variants_productsObj, shop) => {
  let variantImage;
  for (var i = 0; i < variants_productsObj.images.length; i++) {
    if (prod.image_id === variants_productsObj.images[i].id) {
      variantImage = variants_productsObj.images[i].src;
      break;
    }
  }
  Products.findOneAndUpdate(
    {
      productId: prod.id,
      store_id: shop,
    },
    {
      name: variants_productsObj.title + ": " + prod.title,
      product_type: prod.product_type,
      image: variantImage,
    },
    { new: true },
    (e, doc) => {
      if (e) console.log(e);
      console.log("Variant updated successfully!");
    }
  );
};

const saveProduct = async (prod, shop) => {
  var newProduct = Products();
  const prodID = prod.node?.id;
  newProduct.productId = prodID;
  newProduct.name = prod.node?.title;
  newProduct.store_id = shop;
  newProduct.product_type = prod.node?.productType
    ? prod.node?.productType
    : null;
  newProduct.image =
    prod?.node?.images?.edges && prod?.node?.images?.edges?.length > 0
      ? prod?.node?.images?.edges[0]?.node?.src
      : null;

  await newProduct.save(function (err, data) {
    if (err) console.log(err);
    else {
      console.log("Added product!");
    }
  });
};
const updateProduct = async (prod, shop) => {
  await Products.findOneAndUpdate(
    {
      productId: prod.node?.id,
      store_id: shop,
    },
    {
      name: prod.node?.title,
      product_type: prod.node?.productType,
      image: prod?.node?.images?.edges[0]?.node?.src
        ? prod.node.images.edges[0].node.src
        : null,
    },
    { new: true }
  );
};

const saveProducts_variants = async (shop, body) => {
  try {
    if (shop && body) {
      const res = await Products.findOne(
        {
          store_id: shop,
          productId: body.node?.id,
        },
        null,
        { strictQuery: false }
      ).exec();
      var result = res !== null ? res[0] : null;
      if (result === null) {
        await saveProduct(body, shop);
      } else {
        await updateProduct(body, shop);
      }
      if (!!body?.node?.variants) {
        for (let count = 0; count < body.node?.variants.length; count++) {
          var variant_exist = search_array(
            result?.product_variants_ids ? result.product_variants_ids : [],
            body.node?.variants[count].id
          );
          if (!variant_exist) {
            await saveVariant(body.node?.variants[count], body, shop);
          } else if (variant_exist) {
            await updateVariant(body.node?.variants[count], body, shop);
          }
        }
      }
    }
  } catch (e) {
    console.log("error at handleProductsUpdateHook || saveProducts");
    console.log(e);
  }
};

export default saveProducts_variants;
