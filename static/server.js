import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';

// boilerplate copied from routing lab

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    const options = request.query;
});

// user accounts

app.post('/createAccount', async (request, response) => {
    const options = request.query;
});

app.get('/getAccount', async (request, response) => {
    const options = request.query;
});

app.put('/updateAccount', async (request, response) => {
    const options = request.query;
});

app.delete('/deleteAccount', async (request, response) => {
    const options = request.query;
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
