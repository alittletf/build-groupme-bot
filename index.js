import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import axios from 'axios';


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

// ****** APIs TO BOT JS ******
const botFile = require('./bot');
app.use('/api/bot', botFile);