const dotenv = require('dotenv');
dotenv.config();

var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const mockAPIResponse = require('./mockAPI.js');
const apiKey = process.env.API_KEY;
const baseUrl = "https://api.meaningcloud.com/sentiment-2.1?key=";

console.log(`Your API key is ${process.env.API_KEY}`);

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post("/getResults", async(req, res) => {
    const apiData = await fetch(`${baseUrl}${apiKey}&lang=auto&url=${req.body.formUrl}`, {
        method: 'POST'
    });

    try {
        const data = await apiData.json();
        res.send(data);
    } catch (err) {
        console.log(err);
    }
});