"user strict";

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const storeSchema = new Schema(
  {
    shop_id: { type: String, required: true, trim: true, unique: true },
    shop_plan: { type: String, trim: true },
    NutritionInformation: { type: String, default: "Nutrition Information" },
    Ingredients: { type: String, default: "Ingredients" },
    AllergyInformation: { type: String, default: "Allergy Information" },
    LEGALNOTICE: { type: String, default: "*LEGAL NOTICE" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Stores = mongoose.model("Stores", storeSchema);
Stores.CustomTypes = { ObjectId: mongoose.Types.ObjectId };
await Stores.createCollection();

export default Stores;
