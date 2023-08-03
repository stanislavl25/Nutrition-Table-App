import Stores from "./models/storeModel.js";
import { synchronizeData } from "./synchronizeData.js";

export async function checkNewUpdate(shop) {
  const result = await Stores.findOne({ shop_id: shop })
    .select("needsUpdate -_id")
    .exec();
  return result.needsUpdate;
}

export async function launchUpdate(session) {
  /********************************  TURN OFF NEW UPDATES ****************************************/
  await Stores.updateOne(
    { shop_id: session.shop },
    { $set: { needsUpdate: false } }
  ).exec();

  /************************************************************************/

  /*********** SYNCHRONIZE PRODUCT TO INSERT THE NEW METAFIELDS ***********/
  await synchronizeData(session);
  /************************************************************************/

  console.log("update finished");
  return;
}
