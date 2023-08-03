"use strict";

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String },
    store_id: { type: String },
    productId: { type: String, unique: true },
    food_product: { type: Boolean, default: true },
    edited: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    image: { type: String },
    product_type: { type: String },
    nutriScore: { type: String, default: "A" },
    nutriScoreCheck: { type: Boolean, default: false },
    productToPrepare: { type: Boolean, default: false },
    product_variants_ids: [],
    it_is_variant: { type: Boolean, default: false },
    connected_productId_ifVariant: { type: String },
    richText: {
      ingredientsText: {
        type: String,
        default:
          "<p>Mandarin Oranges (37.9%), Light Whipping Cream (<strong>Milk</strong>), Peras (12.4%), Peaches (7.7%), Thompson Seedles Grapes (7.6%), Apple (7.5%), Banana (5.9%), English Walnuts (<strong>Tree Nuts</strong>)</p>",
      },
      allergyInfoText: {
        type: String,
        default:
          "<p>Contains Wheat, Almond, Peanut, Soy, and Milk, It May contain other tree nuts.</p>",
      },
      lEGALNOTICEText: {
        type: String,
        default:
          "<p><strong>*LEGAL NOTICE </strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum risus tempor, blandit nisi sollicitudin, varius diam.</p>",
      },
      notesText: {
        type: String,
      },
    },

    servingSize: {
      CA: {
        servingSizeBasic: { type: String, default: "250" },
        servingRefBasic: { type: String, default: "per 1 cup" },
        bilingualRefBasic: { type: String, default: "pour 1 tasse" },
        unitBasic: { type: String, default: "Milliliters" },
        caloriesPerServingBasic: { type: String, default: "110" },
        unpreparedReference: { type: String, default: "As sold" },
        unpreparedBilingualReference: {
          type: String,
          default: "Tel que vendu",
        },
        unpreparedCalories: { type: String, default: "110" },
        preparedReference: { type: String, default: "Prepared" },
        preparedBilingualReference: { type: String, default: "préparé" },
        preparedCalories: { type: String, default: "70" },
      },
      EU: {
        DefaultAmount: { type: String, default: "100" },
        DefaultAmountUnit: { type: String, default: "Grams" },
        PortionSize: { type: String, default: "25" },
        PortionSizeUnit: { type: String, default: "Grams" },
      },
      NA: {
        Servingspercontainer: { type: String, default: "8" },
        Servingreference: { type: String, default: "2/3 cup" },
        servingsize: { type: String, default: "55" },
        unit: { type: String, default: "Grams" },
        Caloriesperserving: { type: String, default: "230" },
        UnpreparedReference: { type: String, default: "Per 2/3 cup" },
        Unpreparedcalories: { type: String, default: "140" },
        PreparedReference: { type: String, default: "As prepared" },
        Preparedcalories: { type: String, default: "230" },
      },
    },
    minerals: [],
    vitamins: [],
    nutritionData: [],
    calsEnergyInfo: {
      energyKj100: { type: String, default: "1210" },
      energyKj25: { type: String, default: "641" },
      energyKcal100: { type: String, default: "287" },
      energyKcal25: { type: String, default: "152" },
      Ri: { type: String, default: "8" },
    },
    hideProducts: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

let Products = mongoose.model("Products", productSchema);
// Plans.CustomTypes = { ObjectId: mongoose.Types.ObjectId };
await Products.createCollection();

export default Products;
