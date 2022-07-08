"use strict";

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const appSessionSchema = new Schema(
  {
    id: { type: String, trim: true, required: true },
    shop: { type: String, trim: true },
    state: { type: String, trim: true },
    isOnline: { type: Boolean },
    scope: { type: String, trim: true },
    expires: { type: String, trim: true },
    accessToken: { type: String, trim: true },
    onlineAccessInfo: { type: Object },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const AppSession = mongoose.model("appSession", appSessionSchema);
//appSession.CustomTypes = { ObjectId: mongoose.Types.ObjectId };
//await AppSession.createCollection();

export default AppSession;
