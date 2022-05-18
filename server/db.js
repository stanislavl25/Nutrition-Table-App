import mongoose from "mongoose";
import "dotenv/config";

await mongoose.connect(process.env.MONGO_DB_URL, {
  keepAlive: true,
  keepAliveInitialDelay: 300000,
});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default db;
