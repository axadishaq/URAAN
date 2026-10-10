// Give (or remove) admin rights to an existing account.
//   npm run make-admin -- <username>
//   npm run make-admin -- <username> --remove
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import { connectDb } from "../utils/db.js";

dotenv.config();

const username = process.argv[2];
const remove = process.argv.includes("--remove");

if (!username) {
   console.log("Usage: npm run make-admin -- <username> [--remove]");
   process.exit(1);
}

await connectDb();
const user = await User.findOneAndUpdate(
   { username },
   { $set: { isAdmin: !remove } },
   { new: true }
);
if (!user) {
   console.log(`No user named "${username}" was found.`);
} else {
   console.log(
      `${user.username} is ${user.isAdmin ? "now an admin" : "no longer an admin"}. ` +
         "They need to log out and log in again."
   );
}
await mongoose.disconnect();
