import express from "express";
import expressSession from 'express-session';
import path from "path";
import "dotenv/config";
import { faker } from "@faker-js/faker";
import fetch from "node-fetch";
import { CharitableDatabase } from "./database.js";
import auth from './auth.js';
import { response } from "express";

// CONSTS
const APP_ID = process.env.APP_ID;
const APP_KEY = process.env.APP_KEY;
const PORT = process.env.PORT || 3000;
const DBURL = process.env.DBURL;
const ENDPOINT = `https://api.data.charitynavigator.org/v2/`;
const API_KEY = `app_id=${APP_ID}&app_key=${APP_KEY}`;
const PAGE_SIZE = 25;

// database connection
const db = new CharitableDatabase(DBURL);
await db.connect();
await db.init();

// Session configuration
const sessionConfig = {
  // set this encryption key in Heroku config (never in GitHub)!
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
};

// routing
const app = express();
const port = 3000;
app.use(expressSession(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./static"));

// auth
auth.configure(app);

function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    // If we are authenticated, run the next route.
    next();
  } else {
    // Otherwise, redirect to the login page.
    res.redirect('/login.html');
  }
}

///////////////////////////////
// Generators for dummy data
///////////////////////////////
let accounts = [
  {
    id: "1",
    name: faker.name.firstName() + " " + faker.name.lastName(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    bio: faker.lorem.paragraph(),
    pfp: faker.internet.avatar(),
    location: faker.lorem.paragraph(),
    favlist: [],
    likes: [],
    reviews: [
      {
        rid: faker.datatype.number(),
        uid: faker.datatype.number(),
        chid: faker.datatype.number(),
        stars: faker.datatype.number(),
        text: faker.lorem.paragraph(),
      },
      {
        rid: faker.datatype.number(),
        uid: faker.datatype.number(),
        chid: faker.datatype.number(),
        stars: faker.datatype.number(),
        text: faker.lorem.paragraph(),
      },
      {
        rid: faker.datatype.number(),
        uid: faker.datatype.number(),
        chid: faker.datatype.number(),
        stars: faker.datatype.number(),
        text: faker.lorem.paragraph(),
      },
    ],
    donations: [],
  },
];

function generate_fake_review() {
  const review = {
    rid: faker.datatype.uuid(),
    uid: faker.datatype.uuid(),
    chid: faker.datatype.uuid(),
    stars: faker.datatype.number(),
    text: faker.lorem.paragraph(),
  };
  return review;
}

function generate_fake_reviews() {
  const fake_reviews = [];
  for (let i = 0; i < 2; i++) {
    fake_reviews.push(generate_fake_review());
  }
  return fake_reviews;
}

function generate_fake_charity() {
  const charity = {
    eid: faker.datatype.uuid(),
    name: faker.company.companyName(),
    address: faker.address.streetAddress(true),
    accountability: faker.datatype.number(),
    mission: faker.company.catchPhrase(),
    current_rating: faker.datatype.number(),
    likes: faker.datatype.number(),
  };
  return charity;
}

function generate_fake_charity_list() {
  const fake_charities = [];
  for (let i = 0; i < 7; i++) {
    fake_charities.push(generate_fake_charity());
  }
  return fake_charities;
}
function generate_fake_donation() {
  const donation = {
    charity_name: faker.company.companyName(),
    amount: faker.finance.amount(),
    date: faker.date.recent(),
  };
  return donation;
}

function generate_fake_donations_arr() {
  let arr = [];
  for (let i = 0; i < 15; i++) {
    arr.push(generate_fake_donation());
  }
  return arr;
}

async function get_fake_donations_arr(user_id) {
  const data = generate_fake_donations_arr();
  return data;
}


///////////////////////////////
// CRUD Helpers
///////////////////////////////

function formatAddress(street, city, state) {
  let address = "";
  if(state) {
    address = state;
    if(city) {
      address = `${city}, ${address}`;
      if(street) {
        address = `${street} ${address}`;
      }
    }
  }
  return address;
}

async function createClientCharity(serverCharity, user) {
  let address = "Not provided";
  if(serverCharity.mailingAddress) {
    address = formatAddress(serverCharity.mailingAddress.streetAddress1,
                                serverCharity.mailingAddress.city,
                                serverCharity.mailingAddress.stateOrProvince);

  }
  let likes = 0;
  let current_rating = 0;
  let accountability = 0;

  try {
    const dbCharity = await db.readCharity(serverCharity.ein);
    if(dbCharity != null) {
      likes = dbCharity.totalLikes;
    }
    else {
      // not used
      const new_dbCharity = await db.createCharity(serverCharity.ein)
      // will be 0
      likes = new_dbCharity.totalLikes;
    }

  } catch (err) {
    console.log(err);
  }

  const reviews = await getReviews(serverCharity.ein);
  const totalRating = reviews.reduce((a, b) => a + b.stars, 0);
  current_rating = reviews.length === 0 ? null : Math.round(totalRating/reviews.length * 10)/10;

  //TODO
  const charity = {
    eid: serverCharity.ein,
    name: serverCharity.charityName,
    address: address,
    mission: serverCharity.mission,
    accountability: faker.datatype.number(),
    current_rating: current_rating,
    likes: likes,
    reviews: reviews,
  };
  return charity;
}

async function getReviews(ein) {
  const data = [];
  try {
    const dbCharity = await db.readCharity(ein);

    if(dbCharity) {
      for(let rid of dbCharity.reviews) {
        data.push(await db.readReview(rid));
      }
    }
  } catch(err) {
    console.log(err);
  }
  return data;
}

async function search(query) {
  const response = await fetch(
    `${ENDPOINT}Organizations?${API_KEY}&search=${query}&pageSize=${PAGE_SIZE}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();

  const charities = [];
  for (let serverCharity of data) {
    charities.push(await createClientCharity(serverCharity, null));
  }
  return charities;
}

async function get_charity(ein) {
  // get charity from database in form of object below
  const response = await fetch(`${ENDPOINT}Organizations/${ein}?${API_KEY}`, {
    method: "GET",
  });
  const data = await response.json();

  return await createClientCharity(data, null);
}

async function get_liked_charities(user_id) {
  const data = [];
  try {
    const user = await db.readUser(0);
    for (let ein of user.likes) {
      let charity = await get_charity(ein);
      data.push(charity);
    }
  } catch (err) {
    console.log(err);
  }
  //const data = generate_fake_charity_list();
  return data;
}

async function get_favorited_charities(user_id) {
  const data = [];
  try {
    const user = await db.readUser(0);
    for (let ein of user.favlist) {
      let charity = await get_charity(ein);
      data.push(charity);
    }
  } catch (err) {
    console.log(err);
  }
  return data;
}

async function updateList(user_id, ein) {
  // update favorites list of account to include charity with ein ein
  // user id might need to be 0?
  await db.createFavorite(0, ein);
  return 0;
}

async function removeFromList(user_id, ein) {
  // update favorites list of account to exclude charity with ein ein
  // user id might need to be 0?
  await db.deleteFavorite(0, ein);
  return 0;
}

async function addLike(user_id, ein) {
  // update favorites list of account to include charity with ein ein
  // user id might need to be 0?
  const new_charity = await db.createLike(0, ein);
  return new_charity;
}

async function removeLike(user_id, ein) {
  // update favorites list of account to exclude charity with ein ein
  // user id might need to be 0?
  const new_charity = await db.deleteLike(0, ein);
  return new_charity;
}

///////////////////////////////
// Endpoints
///////////////////////////////

app.post("/createCharity", async (request, response) => {
  const options = request.query;
});

app.get("/getCharity", async (request, response) => {
  const options = request.query;
  let ein = options["ein"];
  try {
    let charity = await get_charity(ein);
    response.status(200).json(charity);
  } catch (err) {
    console.log(err);
  }
});

app.put("/updateCharity", async (request, response) => {
  const options = request.query;
});

app.delete("/deleteCharity", async (request, response) => {
  const options = request.query;
});

app.post("/createLike", async (request, response) => {
  const options = request.body;
  let charity_ein = options["ein"];
  try {
    const updated_charity = await addLike(0, charity_ein);
    response.status(200).json(updated_charity);
  } catch (err) {
    response.status(404).json({ status: err });
  }
});

app.delete("/deleteLike", async (request, response) => {
  const options = request.body;
  let charity_ein = options["ein"];
  try {
    const updated_charity = await removeLike(0, charity_ein);
    response.status(200).json(updated_charity);
  } catch (err) {
    response.status(404).json({ status: err });
  }
});

app.get("/getLikedCharities", async (request, response) => {
  const options = request.query;
  let user_id = null;
  const data = await get_liked_charities(user_id);
  try {
    response.status(200).json(data);
  } catch (err) {
    response.status(404).json({ status: err });
  }
});

app.get("/getLikedCharitiesEins", async (request, response) => {
  const options = request.query;
  let user_id = null;
  try {
    const user = await db.readUser(0);
    const data = user.likes;
    response.status(200).json(data);
  } catch (err) {
    response.status(404).json({ status: err });
  }
});

app.post("/createReview", async (request, response) => {
  const options = request.query;
  try {
    const data = await db.createReview(options.uid, options.cid, options.stars, options.text);
    response.status(200).json(data);
  } catch (err) {
    response.status(404).json({ status: err });
  }
});

app.get("/readReview", async (request, response) => {
  const options = request.query;
  try {
    const data = await db.readReview(options.rid);
    response.status(200).json(data);
  } catch (err) {
    response.status(404).json({ status: err });
  }
});

app.delete("/deleteReview", async (request, response) => {
  const options = request.query;
  try {
    const data = await db.deleteReview(options.rid);
    response.status(200).json(data);
  } catch (err) {
    response.status(404).json({ status: err });
  }
});

app.get("/getReviews", async (request, response) => {
  const options = request.query;
  let data = [];
  try {
    data = await getReviews(options.ein);
    response.status(200).json(data);
  } catch (err) {
    response.status(404).json({ status: err });
  }
});

app.get("/search", async (request, response) => {
  const query = request.query;
  try {
    let results = await search(query["query"]);
    response.status(200).json(results);
  } catch (err) {
    response.status(404).json(err);
  }
});

app.get("/getDonation", async (request, response) => {
  let user_id = 0; 
  const user = await db.readUser(user_id);
  const data = user.donations; // await get_fake_donations_arr(user_id);
  try {
    response.status(200).json(data);
  } catch (err) {
    response.status(404).json(err);
  }
});

// donation creation endpoint
app.post("/createDonation", async (request, response) => { //charity name, amount, date
  const options = request.body; // get the charity, amount, date from here
  let user_id = 0; 
  let updated_donations_arr = (await db.readUser(user_id)).donations.slice();
  console.log(updated_donations_arr);
  try {

       updated_donations_arr.push({ charityName: options.charityName, amount: options.amount, date: options.date});
       await db.updateUser(user_id, { donations: updated_donations_arr });

    response.status(200).json({ status: "success" });
  } catch (err) {
    response.status(404).json(err);
  }
});

// donation deletion endpoint
app.delete("/deleteDonation", async (request, response) => {
  // extract user id, find account then delete donation from their
  const options = request.body;
  let user_id = 0; 
  let updated_donations_arr = (await db.readUser(user_id)).donations.slice();
  console.log(updated_donations_arr);

  let charity = options["charityName"]; // name of charity user wants to delete
  let amount = options["amount"];
  let date = options["date"];

  try {
    // account's donations array
    for (const [index, donation] of updated_donations_arr) { //interate through donations array
      if (donation.charityName === charity && donation.amount === amount && donation.date === date) { //if found charity match, date match and amount match
        updated_donations_arr.splice(index, 1);
        console.log(updated_donations_arr);
        await db.updateUser(user_id, { donations: updated_donations_arr }); //delete from donations array, then delete from table

      } else {
        response.json({ err: `Donation Not Found` }); //donation doen't exist
      }
    }
    response.status(200).json({ status: "success" });
  } catch (err) {
    response.status(404).json(err);
  }
});

// user accounts
app.post("/createAccount", async (request, response) => {
  const options = request.body; //later, use faker as of now
  //pass_word will come into play later with autentication
  //repeat user names because of unique id?
  try {
    //let new_user = {
    //    id: faker.datatype.uuid(),
    //    name: faker.name.firstName() + " " + faker.name.lastName(),
    //    username: faker.name.firstName(),
    //    email: faker.internet.email(),
    //    bio: faker.lorem.paragraph(),
    //    pfp: faker.image.avatar(),
    //    location: faker.random.locale(),
    //    favlist: [],
    //    likes: [],
    //    reviews: [],
    //    donations: []
    //};
    //accounts.push(new_user);
    //await saveAccounts();
    //response.json(new_user);
    response.status(200).json({ status: "success" });
  } catch (err) {
    response.status(404).json(err);
  }

  //{id, fave list --> charity ids (ein), likes --> charity ids, reviews --> review ids, username, bio, email, profile --> string, set --> zip code, donations dono objects}
});

app.get("/getAccount", async (request, response) => {
  const options = request.query;
  try {
    const user = request.user;
    response.status(200).json(user);
  } catch (err) {
    response.status(404).json(err);
  }
});

app.put("/updateAccount", async (request, response) => {
  const options = request.body;
  let account_id = request.user.id;
  try {
    await db.updateUser(account_id, options);
    response.status(200).json({ status: "success" });
  } catch (err) {
    response.status(404).json(err);
  }
});

app.delete("/deleteAccount", async (request, response) => {
  const options = request.query;
  let account_id = options["account_id"]; // user id
  try {
    for (const [index, user_object] of accounts.entries()) {
      if (user_object.id === account_id) {
        accounts.splice(index);
      }
    }
    response.status(200).json({ status: "success" });
  } catch (err) {
    response.status(404).json(err);
  }
});

// favorite lists
app.post("/addFavorite", async (request, response) => {
  const options = request.body;
  let user_id = null;
  let charity_ein = options["ein"];
  try {
    await updateList(user_id, charity_ein)
    response.status(200).json({ status: "success" });
  } catch (err) {
    response.status(404).json({ status: err });
  }
});

app.delete("/removeFavorite", async (request, response) => {
  const options = request.body;
  let user_id = null;
  let charity_ein = options["ein"];
  try {
    await removeFromList(user_id, charity_ein);
    response.status(200).json({ status: "success" });
  } catch (err) {
    response.status(404).json({ status: err });
  }
});

app.get("/getFavoritedCharities", async (request, response) => {
  const options = request.query;
  let user_id = null;
  const data = await get_favorited_charities(user_id);
  try {
    response.status(200).json(data);
  } catch (err) {
    response.status(404).json({ status: err });
  }
});

// Auth endpoints
app.post('/login', auth.authenticate('local', {
    // use username/password authentication
    successRedirect: '/profileAuth',
    failureRedirect: '/login-failed.html', // otherwise, back to login
  })
);

app.get('/logout', (req, res) => {
  req.logout(); // Logs us out!
  res.redirect('/login.html');
});

app.get("/searchAuth", checkLoggedIn, async (request, response) => {
  response.redirect("/search.html");
});

app.get("/donationsAuth", checkLoggedIn, async (request, response) => {
  response.redirect("/donations.html");
});

app.get("/favoritesAuth", checkLoggedIn, async (request, response) => {
  response.redirect("/favorites.html");
});

app.get("/likesAuth", checkLoggedIn, async (request, response) => {
  response.redirect("/likes.html");
});

app.get("/profileAuth", checkLoggedIn, async (request, response) => {
  response.redirect("/profile.html");
});

app.get("/getFavoritedCharitiesEins", async (request, response) => {
  const options = request.query;
  let user_id = request.user.id;
  try {
    const user = await db.readUser(user_id);
    const data = user.favlist;
    response.status(200).json(data);
  } catch (err) {
    response.status(404).json({ status: err });
  }
});

// Load index.html
app.get("/", function (req, res) {
  res.sendFile("index.html");
});

// This matches all routes that are not defined.
app.all("*", async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

// Start the server.
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
