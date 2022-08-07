"use strict";

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const customFieldSchema = new Schema(
  {
    name: { type: String, trim: true },
    product_id: { type: String },
    unit: { type: String, default: "Grams" },
    dailyValue: { type: String },
    bold: { type: String },
    order: { type: String },
    leftSpacing: { type: String },
    preparedProduct: { type: String },
    quantity: { type: String },
    preparedProductQuantity: { type: String },
    preparedProductDV: { type: String },
    preparedProductUnit: { type: String },
    per100g: { type: String },
    perportion: { type: String },
    RI: { type: String },
    hideProducts: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
let CustomFields = mongoose.model("Custom Fields", customFieldSchema);

export default CustomFields;
