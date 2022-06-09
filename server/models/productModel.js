"use strict";

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String },
    store_id: { type: String },
    productId: { type: String },
    food_product: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    images: {},
    product_type: { type: String },
  },
  {
    timestamps: true,
  }
);

let Products = mongoose.model("Products", productSchema);
// Plans.CustomTypes = { ObjectId: mongoose.Types.ObjectId };
await Products.createCollection();

export default Products;
