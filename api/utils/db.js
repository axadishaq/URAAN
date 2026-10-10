import dns from "node:dns";
import mongoose from "mongoose";

// read when connecting, after dotenv has loaded api/.env
export const dbName = () => process.env.MONGO_DB || "uraan";

// Some Windows / ISP DNS servers refuse the SRV lookup that "mongodb+srv://"
// addresses need ("querySrv ECONNREFUSED"). If that happens, retry once using
// public DNS servers.
const isSrvLookupError = (err) =>
   /querySrv|ENOTFOUND|ECONNREFUSED|ETIMEOUT/.test(`${err?.code} ${err?.syscall} ${err?.message}`) &&
   /srv|querySrv|_mongodb\._tcp/i.test(`${err?.syscall} ${err?.message} ${err?.hostname}`);

// Connect the default mongoose connection (used by the models)
export const connectDb = async (uri = process.env.MONGO, name = dbName()) => {
   try {
      return await mongoose.connect(uri, { dbName: name });
   } catch (err) {
      if (!isSrvLookupError(err)) throw err;
      console.warn("DNS lookup for MongoDB failed, retrying with public DNS (8.8.8.8, 1.1.1.1)...");
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
      return await mongoose.connect(uri, { dbName: name });
   }
};
