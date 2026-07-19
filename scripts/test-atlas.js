const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

function loadEnvLocal() {
  const raw = fs.readFileSync(path.join(process.cwd(), ".env.local"), "utf8");
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i < 0) continue;
    const key = trimmed.slice(0, i).trim();
    let val = trimmed.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

(async () => {
  try {
    const env = loadEnvLocal();
    const uri = env.MONGODB_URI;
    if (!uri || !uri.includes("mongodb+srv")) {
      console.error("FAIL: Atlas MONGODB_URI missing");
      process.exit(1);
    }
    const safe = uri.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@");
    console.log("Connecting:", safe.split("?")[0]);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 20000 });
    const db = mongoose.connection.db;
    const ping = await db.admin().ping();
    console.log("Ping:", JSON.stringify(ping));
    console.log("Database:", db.databaseName);
    const cols = await db.listCollections().toArray();
    console.log(
      "Collections:",
      cols.map((c) => c.name).join(", ") || "(empty — ready for first signup)",
    );
    await mongoose.disconnect();
    console.log("OK: Atlas connection works");
    process.exit(0);
  } catch (e) {
    console.error("FAIL:", e.message);
    process.exit(1);
  }
})();
