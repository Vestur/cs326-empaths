import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
import * as keys from "../keys.js";
import {Faker, faker} from "@faker-js/faker"
import * as database from "./database.js";

// api keys
const app_id = keys.app_id;
const app_key = keys.app_key;

// boilerplate copied from routing lab

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static("static"));

let accounts = [];
const accounts_JSONfile = 'accounts.json';

async function reload(filename) {
    try {
      const data = await readFile(filename, { encoding: 'utf8' });
      accounts = JSON.parse(data);
    } catch (err) {
      accounts = [];
    }
  }

async function saveAccounts(){
    try {
        const data = JSON.stringify(accounts);
        await writeFile(accounts_JSONfile, data, { encoding: 'utf8' });
    } catch (err) {
        console.log(err);
    }
}

async function search(query) {
    // return array of eins
    // const search_results = await fetch(`https://api.data.charitynavigator.org/v2/Organizations?app_id=${app_id}&app_key=${app_key}&search=${query}`);
    return [faker.number, faker.number, faker.number];
}

async function get_charity(ein) {
    const faker_ret = Faker()
    return faker_ret;
}

async function updateList(account_number, ein) {
    // update favorites list of account to include charity with ein ein
    return 0;
}

async function removeFromList(account_number, ein) {
    // update favorites list of account to exclude charity with ein ein
    return 0;
}

// charities

app.post('/createCharity', async (request, response) => {
    const options = request.query;
});

app.get('/getCharity', async (request, response) => {
    const options = request.query;
    let ein = options["ein"];
    return await get_charity(ein);
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
});

app.delete('/deleteLike', async (request, response) => {
    const options = request.query;
});

// reviews

app.post('/createReview', async (request, response) => {
    const options = request.query;
});

app.delete('/deleteReview', async (request, response) => {
    const options = request.query;
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

// donation creation endpoint 
app.post('/createDonation', async (requent, response) => {
    const options = request.body; 
    //charity name, amount, date 
    let account_id = options['account_id'];
    await reload(accounts_JSONfile);

    try {
        for(const [index, user_object] of accounts.entries()){
            if(user_object.id === account_id){
                user_object.donations.push({ charity_name: faker.string, amount: faker.string, date: faker.string}); //all be strings?
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
    await reload(accounts_JSONfile);

    try{
        for(const [index, user_object] of accounts.entries()){   // go through accounts array, extract user object
            if(user_object.id === account_id){                  // if account id matches one passed in
                let donations_arr = user_object.donations;     //account's donations array 
                for(const [index, donation] of donations_arr.entries()){  //interate through donations array
                    if(donation.charity_name === charity){               //if found charity match
                        delete donations_arr[index];                    //delete from donations array 
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
    await reload(accounts_JSONfile);
    //const options = request.body; later, use faker as of now
    
    const id = options.id; 
    //const email = options.email;
    const user = options.user;
    //const pass = options.pass; 
    const bio = options.bio; 
    const faves = options.favorites; 
    const reviews = options.reviews; 

    //{id, fave list --> charity ids (ein), likes --> charity ids, reviews --> review ids, username, bio, email, profile --> string, set --> zip code, donations dono objects} 
    //const faves = options.faves
    /**
     * if user undefined | email | pass word undefined  
     * bad request 
     * response status 400
     * 
     */
});

app.get('/getAccount', async (request, response) => {
    const options = request.query;
});

app.put('/updateAccount', async (request, response) => {
    const options = request.query;
   //updateAccount(response, options.whatever we're updating)
   //bio and everything 
});

app.delete('/deleteAccount', async (request, response) => {
    const options = request.query;
    //deleteAccount(response, options.id) 
    //id 
});

// favorite lists

// initialize list (empty)
app.post('/createList', async (request, response) => {
    const options = request.query;
});

// get array of charity items that populate list
app.get('/getList', async (request, response) => {
    const options = request.query;
});

// add to list
app.put('/updateList', async (request, response) => {
    const body = request.body;
    try {
        let account_id = body["account_id"];
        let charity_ein = body["ein"];
        await updateList(account_id, charity_ein);
        response.status(200).json({"status": "success"});
    }
    catch (error) {
        response.status(404).json(error);
    }
});

//delete from list
app.delete('/deleteList', async (request, response) => {
    const body = request.body;
    try {
        let account_id = body["account_id"];
        let charity_ein = body["ein"];
        await removeFromList(account_id, charity_ein);
        response.status(200).json({"status": "success"});
    }
    catch (error) {
        response.status(404).json(error);
    }
});

// This matches all routes that are not defined.
app.all('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

// Start the server.
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

