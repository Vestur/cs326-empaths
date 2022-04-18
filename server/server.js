import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
import * as keys from "../keys.js";

// api keys
const app_id = keys.app_id;
const app_key = keys.app_key;

// boilerplate copied from routing lab

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


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
    const search_results = await fetch(`https://api.data.charitynavigator.org/v2/Organizations?app_id=${app_id}&app_key=${app_key}&search=${query}`);
    return search_results;
}

// charities

app.post('/createCharity', async (request, response) => {
    const options = request.query;
});

app.get('/getCharity', async (request, response) => {
    const options = request.query;
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
    const body = request.body;
    try {
        let results = await search(body["query"]);
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

app.post('/createList', async (request, response) => {
    const options = request.query;
});

app.get('/getList', async (request, response) => {
    const options = request.query;
});

app.put('/updateList', async (request, response) => {
    const options = request.query;
});

app.delete('/deleteList', async (request, response) => {
    const options = request.query;
});
