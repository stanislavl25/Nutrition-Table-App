"use strict";

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const customFieldSchema = new Schema(
  {
    id: { type: String, trim: true },
    product_id: { type: Schema.Types.ObjectId, ref: "Products" },
    properties: {},
  },
  {
    timestamps: true,
  }
);
let CustomFields = mongoose.model("Custom Fields", customFieldSchema);

export default CustomFields;
