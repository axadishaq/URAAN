// Copy every collection from one database to another in the same cluster.
//
//   npm run migrate-data -- --dry-run              show what would be copied
//   npm run migrate-data                           copy fiverr -> uraan
//   npm run migrate-data -- --from old --to new    other database names
//   npm run migrate-data -- --force                also copy into collections
//                                                  that already have documents
//
// The source database is only read, never changed. Documents keep their _id,
// so links between users, services, orders and chats stay intact.
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDb } from "../utils/db.js";

dotenv.config();

const arg = (name, fallback) => {
   const i = process.argv.indexOf(`--${name}`);
   return i > -1 ? process.argv[i + 1] : fallback;
};
const FROM = arg("from", "fiverr");
const TO = arg("to", process.env.MONGO_DB || "uraan");
const DRY = process.argv.includes("--dry-run");
const FORCE = process.argv.includes("--force");
const BATCH = 500;

if (FROM === TO) {
   console.log("Source and target are the same database. Nothing to do.");
   process.exit(1);
}

await connectDb(process.env.MONGO, FROM);
const source = mongoose.connection.useDb(FROM).db;
const target = mongoose.connection.useDb(TO).db;

const collections = (await source.listCollections({}, { nameOnly: true }).toArray())
   .map((c) => c.name)
   .filter((n) => !n.startsWith("system."))
   .sort();

console.log(`${DRY ? "[dry run] " : ""}Copying database "${FROM}" -> "${TO}"\n`);
let problems = 0;

for (const name of collections) {
   const src = source.collection(name);
   const dst = target.collection(name);
   const srcCount = await src.countDocuments();
   const dstCount = await dst.countDocuments();

   if (dstCount > 0 && !FORCE) {
      console.log(`  ${name.padEnd(14)} skipped: "${TO}.${name}" already has ${dstCount} documents (use --force)`);
      problems++;
      continue;
   }
   if (DRY) {
      console.log(`  ${name.padEnd(14)} ${srcCount} documents would be copied`);
      continue;
   }

   // copy documents in batches; with --force, existing _ids are skipped
   let copied = 0;
   let batch = [];
   const flush = async () => {
      if (!batch.length) return;
      try {
         const res = await dst.insertMany(batch, { ordered: false });
         copied += res.insertedCount;
      } catch (err) {
         // duplicate _id (code 11000) only happens with --force: keep the existing one
         copied += err.result?.insertedCount ?? err.insertedCount ?? 0;
         const other = (err.writeErrors || []).filter((e) => e.code !== 11000);
         if (other.length || !err.writeErrors) throw err;
      }
      batch = [];
   };
   for await (const doc of src.find()) {
      batch.push(doc);
      if (batch.length >= BATCH) await flush();
   }
   await flush();

   // same indexes as the source (unique usernames, conversation ids, ...)
   const indexes = (await src.indexes()).filter((ix) => ix.name !== "_id_");
   for (const { key, name: ixName, v: _v, ns: _ns, ...options } of indexes) {
      try {
         await dst.createIndex(key, { name: ixName, ...options });
      } catch (err) {
         console.log(`    index ${ixName} not created: ${err.message}`);
      }
   }

   const finalCount = await dst.countDocuments();
   const ok = finalCount >= srcCount;
   if (!ok) problems++;
   console.log(`  ${name.padEnd(14)} ${copied} copied, ${TO} now has ${finalCount} / ${srcCount} ${ok ? "OK" : "MISMATCH"}`);
}

console.log(
   `\n${DRY ? "Dry run finished. Run without --dry-run to copy." : problems ? `Finished with ${problems} problem(s).` : "All collections copied and verified."}`
);
await mongoose.disconnect();
process.exit(problems && !DRY ? 1 : 0);
