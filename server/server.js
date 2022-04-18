import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
import * as keys from "../keys.js";
import {Faker, faker} from "@faker-js/faker"
import * as database from "database.js";

// api keys
const app_id = keys.app_id;
const app_key = keys.app_key;

// boilerplate copied from routing lab

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/", app.static("static"));

let accounts = [];
const accounts_JSONfile = 'accounts.json';

async function reload(filename) {
    try {
      const data = await readFile(filename, { encoding: 'utf8' });
      counters = JSON.parse(data);
    } catch (err) {
      counters = {};
    }
  }

async function saveAccounts(){
    
}

async function createAccount(){

}

async function getAccount(){
    
}

async function updateAccount(){
    
}

async function deleteAccount(){
    
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

// user accounts

app.post('/createAccount', async (request, response) => {
    const options = request.query;
    //createAccount(response, options.email, options.username, options.password);
    //should we track accounts using a number id?
});

app.get('/getAccount', async (request, response) => {
    const options = request.query;
    //getAccount(response, options.id) //get account based on id or username?
});

app.put('/updateAccount', async (request, response) => {
    const options = request.query;
   //updateAccount(response, options.whatever we're updating)
});

app.delete('/deleteAccount', async (request, response) => {
    const options = request.query;
    //deleteAccount(response, options.id) //id or username 
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