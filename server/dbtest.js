import 'dotenv/config';
import {CharitableDatabase} from "./database.js";

// database connection
const dburl = process.env.DBURL;
const db = new CharitableDatabase(dburl);
await db.connect();
await db.init();

const res = await db.deleteReview(3);
console.log(res);

await db.close();
