import express from 'express';
import path from 'path';
import 'dotenv/config';
import { faker } from "@faker-js/faker"
import fetch from "node-fetch";
import { CharitableDatabase } from "./database.js";

// api keys
const APP_ID = process.env.APP_ID;
const APP_KEY = process.env.APP_KEY;
const PORT = process.env.PORT || 3000;
const DBURL = process.env.DBURL;
const ENDPOINT = `https://api.data.charitynavigator.org/v2/`
const API_KEY=`app_id=${APP_ID}&app_key=${APP_KEY}`

// database connection
const db = new CharitableDatabase(DBURL);
await db.connect();
await db.init();

// boilerplate copied from routing lab

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./static"));

let accounts = [ {
                id: '1',
                name: faker.name.firstName() + " " + faker.name.lastName(),
                username: faker.name.firstName(),
                email: faker.internet.email(),
                bio: faker.lorem.paragraph(),
                pfp: faker.internet.avatar(),
                location: faker.lorem.paragraph(),
                favlist: [],
                likes: [],
                reviews: [ {  rid: faker.datatype.number(),
                          uid: faker.datatype.number(),
                          chid: faker.datatype.number(),
                          stars: faker.datatype.number(),
                          text: faker.lorem.paragraph()},
                          {  rid: faker.datatype.number(),
                          uid: faker.datatype.number(),
                          chid: faker.datatype.number(),
                          stars: faker.datatype.number(),
                          text: faker.lorem.paragraph()},
                          {  rid: faker.datatype.number(),
                          uid: faker.datatype.number(),
                          chid: faker.datatype.number(),
                          stars: faker.datatype.number(),
                          text: faker.lorem.paragraph()} ],
                donations: []
            } ];

const __dirname = path.resolve(path.dirname(''));

///////////////////////////////
// Generators for dummy data
///////////////////////////////

function generate_fake_review() {
    const review = {
        rid: faker.datatype.uuid(),
        uid: faker.datatype.uuid(),
        chid: faker.datatype.uuid(),
        stars: faker.datatype.number(),
        text: faker.lorem.paragraph(),
    }
    return review;
}

function generate_fake_reviews() {
    const fake_reviews = [];
    for(let i = 0; i < 2; i++) {
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
    }
    return charity;
}

function generate_fake_charity_list() {
    const fake_charities = [];
    for(let i = 0; i < 7; i++) {
        fake_charities.push(generate_fake_charity());
    }
    return fake_charities;
}

///////////////////////////////
// CRUD Helpers
///////////////////////////////

function createClientCharity(serverCharity, user) {
    const address = `${serverCharity.mailingAddress.streetAddress1} ${serverCharity.mailingAddress.city}, ${serverCharity.mailingAddress.stateOrProvince}`;

    //TODO
    const charity = {
        eid: serverCharity.ein,
        name: serverCharity.charityName,
        address: address,
        mission: serverCharity.mission,
        accountability: faker.datatype.number(),
        current_rating: faker.datatype.number(),
        likes: faker.datatype.number(),
    }
    return charity;
}

async function search(query) {
    // return array of eins
    // const search_results = await fetch(`https://api.data.charitynavigator.org/v2/Organizations?app_id=${app_id}&app_key=${app_key}&search=${query}`);
    const response = await fetch(`${ENDPOINT}Organizations?${API_KEY}&search=${query}&pageSize=25`, {
        method: 'GET',
    });
    const data = await response.json();

    const charities = [];
    for(let serverCharity of data) {
       charities.push(createClientCharity(serverCharity, null));
    }
    //let search_results = [];
    //for(let i = 0; i < 5; ++i) {
    //    search_results.push(faker.datatype.number());
    //}
    return charities;
}

async function get_charity(ein) {
    // get charity from database in form of object below
    const response = await fetch(`${ENDPOINT}Organizations/${ein}?${API_KEY}`, {
        method: 'GET',
    });
    const data = response.json();

    return createClientCharity(data, null);
}

async function get_liked_charities(user_id) {
    const data = generate_fake_charity_list();
    return data;
}

async function get_favorited_charities(user_id) {
    const data = generate_fake_charity_list();
    return data;
}

async function updateList(account_number, ein) {
    // update favorites list of account to include charity with ein ein
    return 0;
}

async function removeFromList(account_number, ein) {
    // update favorites list of account to exclude charity with ein ein
    return 0 ;
}

///////////////////////////////
// Endpoints
///////////////////////////////

app.post('/createCharity', async (request, response) => {
    const options = request.query;
});

app.get('/getCharity', async (request, response) => {
    const options = request.query;
    let ein = options["ein"];
    try {
        let charity = await get_charity(ein);
        response.status(200).json(charity);
    }
    catch (error) {
        console.log(error);
    }
});


app.put('/updateCharity', async (request, response) => {
    const options = request.query;
});

app.delete('/deleteCharity', async (request, response) => {
    const options = request.query;
});

// likes

app.post('/createLike', async (request, response) => {
    const options = request.query;
    try {
        response.status(200).json({ status: "success" });
    }
    catch (error) {
        response.status(404).json({ status: err });
    }
});

app.delete('/deleteLike', async (request, response) => {
    const options = request.query;
    try {
        response.status(200).json({ status: "success" });
    }
    catch (error) {
        response.status(404).json({ status: err });
    }
});

app.get('/getLikedCharities', async (request, response) => {
    const options = request.query;
    let user_id = null;
    const data = await get_liked_charities(user_id);
    try {
        response.status(200).json(data);
    }
    catch (error) {
        response.status(404).json({ status: err });
    }
});

// reviews

app.post('/createReview', async (request, response) => {
    const options = request.query;
});

app.delete('/deleteReview', async (request, response) => {
    const options = request.query;
});

app.get('/getReviews', async (request, response) => {
    const options = request.body;
    const data = generate_fake_reviews();
    try {
        response.status(200).json(data);
    }
    catch (error) {
        response.status(404).json({ status: err });
    }
});

// search
app.get('/search', async (request, response) => {
    const query = request.query;
    try {
        let results = await search(query["query"]);
        response.status(200).json(results);
    }
    catch (error) {
        response.status(404).json(error);
    }
});

function generate_fake_donation(){
    const donation = {
        charity_name: faker.company.companyName(),
        amount: faker.finance.amount(),
        date: faker.date.recent()
    };
    return donation;
}

function generate_fake_donations_arr(){
    let arr = [];
    for(let i = 0; i < 15; i++){
        arr.push(generate_fake_donation());
    }
    return arr;
}

async function get_fake_donations_arr(user_id){
        const data = generate_fake_donations_arr();
        return data;
}

app.get('/getDonation', async (request, response) => {
    const options = request.query;
    let user_id = null;
    const data = await get_fake_donations_arr(user_id);
    try {

        response.status(200).json(data);

    } catch (err){

        response.status(404).json(error);
    }
});

// donation creation endpoint
app.post('/createDonation', async (requent, response) => {
    const options = request.body; //charity name, amount, date
    let account_id = options['account_id'];

    try {
        for(const [index, user_object] of accounts.entries()){
            if(user_object.id === account_id){
                user_object.donations.push(generate_fake_donation());
            }
        }
        response.status(200).json({"status": "success"});

    } catch (err){
        response.status(404).json(error);
    }
});

// donation deletion endpoint
app.delete('/deleteDonation', async (request, response) => {
    const options = request.body;
    // extract user id, find account then delete donation from their
    let account_id = options['account_id']; // user id
    let charity = options['charity_name']; // name of charity user wants to delete

    try{
        for(const [index, user_object] of accounts.entries()){   // go through accounts array, extract user object
            if(user_object.id === account_id){                  // if account id matches one passed in
                let donations_arr = user_object.donations;     //account's donations array
                for(const [index, donation] of donations_arr.entries()){  //interate through donations array
                    if(donation.charity_name === charity){               //if found charity match
                        donations_arr.splice(index);                    //delete from donations array
                    }
                    else{
                        response.json({ error: `Donation Not Found` }); //donation doen't exist
                    }
                }
            }
            else{
                response.json({ error: `User Not Found` });
            }
        }
        response.status(200).json({"status": "success"});
    }
    catch (error) {
        response.status(404).json(error);
    }
});

// user accounts
app.post('/createAccount', async (request, response) => {
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
        response.status(200).json({"status": "success"});
    } catch (err){
        response.status(404).json(err);
    }

    //{id, fave list --> charity ids (ein), likes --> charity ids, reviews --> review ids, username, bio, email, profile --> string, set --> zip code, donations dono objects}
});

app.get('/getAccount', async (request, response) => {
    const options = request.query;
    let account_id = options['account_id']; // user id
    try {
        let found = false;
        for(const user_object of accounts){
            if(user_object.id === account_id){
                response.status(200).json(user_object);
                found = true;
                break;
            }
        }
        if (!found) {
            response.status(404).json({"status": "not found"});
        }
    } catch (err){
        response.status(404).json(err);
    }
});

app.put('/updateAccount', async (request, response) => {
    const options = request.query;
    let account_id = options['account_id']; // user id
    try {
        for(const [index, user_object] of accounts.entries()){
            if(user_object.id === account_id){
                //update field of user_object here
                continue;
            }
        }
        response.status(200).json({"status": "success"});

    } catch (err){
        response.status(404).json(error);
    }
});

app.delete('/deleteAccount', async (request, response) => {
    const options = request.query;
    let account_id = options['account_id']; // user id
    try {
        for(const [index, user_object] of accounts.entries()){
            if(user_object.id === account_id){
                accounts.splice(index);
            }
        }
        response.status(200).json({"status": "success"});

    } catch (err){
        response.status(404).json(error);
    }
});

// favorite lists
app.post('/addFavorite', async (request, response) => {
    const options = request.query;
    // Process userid here...
    try {
        response.status(200).json({ status: "success" });
    }
    catch (error) {
        response.status(404).json({ status: err });
    }
});

app.delete('/removeFavorite', async (request, response) => {
    const options = request.query;
    // Process userid here...
    try {
        response.status(200).json({ status: "success" });
    }
    catch (error) {
        response.status(404).json({ status: err });
    }
});
app.get('/getFavoritedCharities', async (request, response) => {
    const options = request.query;
    let user_id = null;
    const data = await get_favorited_charities(user_id);
    try {
        response.status(200).json(data);
    }
    catch (error) {
        response.status(404).json({ status: err });
    }
});


// // initialize list (empty)
// app.post('/createList', async (request, response) => {
//     const options = request.query;
// });

// // get array of charity items that populate list
// app.get('/getList', async (request, response) => {
//     const options = request.query;
// });

// // add to list
// app.put('/updateList', async (request, response) => {
//     const body = request.body;
//     try {
//         let account_id = body["account_id"];
//         let charity_ein = body["ein"];
//         let state = await updateList(account_id, charity_ein);
//         if(state === -1) {
//             response.status(404).json({"status": "no such charity in favorites"})
//         }
//         response.status(200).json({"status": "success"});
//     }
//     catch (error) {
//         response.status(404).json(error);
//     }
// });

// //delete from list
// app.delete('/deleteList', async (request, response) => {
//     const body = request.body;
//     try {
//         let account_id = body["account_id"];
//         let charity_ein = body["ein"];
//         let state = await removeFromList(account_id, charity_ein);
//         if(state === -1) {
//             response.status(404).json({"status": "no such charity in favorites"})
//         }
//         response.status(200).json({"status": "success"});
//     }
//     catch (error) {
//         response.status(404).json(error);
//     }
// });

// Load index.html
app.get('/', function(req, res) {
    res.sendFile('index.html');
});

// This matches all routes that are not defined.
app.all('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
});

// Start the server.
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

