"use strict";

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const appSessionSchema = new Schema(
  {
    id: { type: String, trim: true, required:true, default: ""},
    entries: {type: Object}
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const AppSession = mongoose.model("shopify_sessions", appSessionSchema);
//appSession.CustomTypes = { ObjectId: mongoose.Types.ObjectId };
//await AppSession.createCollection();

export default AppSession;

