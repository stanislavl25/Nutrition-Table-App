"user strict";

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const storeSchema = new Schema(
  {
    shop_id: { type: String, required: true, trim: true, unique: true },
    shop_plan: { type: String, trim: true, default: "Advanced" },
    AlreadySubscribed: { type: Boolean, default: false },
    firstTimeOpenApp: { type: Boolean, default: true },
    NutritionInformation: { type: String, default: "Nutrition Information" },
    portionSizeModalCheckBox: { type: Boolean, default: false },
    Ingredients: { type: String, default: "Ingredients" },
    AllergyInformation: { type: String, default: "Allergy Information" },
    LEGALNOTICE: { type: String, default: "*LEGAL NOTICE" },
    per: { type: String, default: "per" },
    portion: { type: String, default: "portion" },
    energy: { type: String, default: "energy" },
    servingSize: { type: String, default: "Serving size" },
    nutritionFacts: { type: String, default: "Nutrition Facts" },
    servingsPerContainer: { type: String, default: "servings per container" },
    preparedPortion: { type: String, default: "Prepared portion" },
    aPreparedPortionIsEquivalentTo: {
      type: String,
      default: "A prepared portion is equivalent to",
    },
    referenceIntakeDisclaimer: {
      type: String,
      default: "*Reference intake of an average adult (8 400 kJ / 2 000 kcal)",
    },
    amountPerServing: { type: String, default: "Amount per serving" },
    valeurNutritive: { type: String, default: "Valeur nutritive" },
    dailyValue: { type: String, default: "% Daily Value*" },
    valeurQuotidienne: { type: String, default: "% valeur quotidienne*" },
    calories: { type: String, default: "calories" },
    recommendedIntake: [],
    location: { type: String },
    freeTrialDone_Paid: { type: Boolean, default: false },
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
