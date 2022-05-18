"use strict";

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String },
    store_id: { type: Schema.Types.ObjectId, ref: "Stores" },
    is_edited: { type: Boolean },
    productId: { type: String },
    calories: { type: String, default: 0 },
    totalFat: { type: String, default: 0 },
    carbohydrate: { type: String, default: 0 },
    protein: { type: String, default: 0 },
    salt: { type: String, default: 0 },
    food_product: { type: Boolean },
    nutritions: {},
  },
  {
    timestamps: true,
  }
);

let Products = mongoose.model("Products", productSchema);
// Plans.CustomTypes = { ObjectId: mongoose.Types.ObjectId };
await Products.createCollection();

export default Products;
