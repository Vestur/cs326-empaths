import 'dotenv/config';
import {CharitableDatabase} from "./database.js";

// database connection
const dburl = process.env.DBURL;
const db = new CharitableDatabase(dburl);
await db.connect();

await db.userCollection.deleteMany({});
await db.charityCollection.deleteMany({});
await db.reviewCollection.deleteMany({});
await db.init();

await db.close();
