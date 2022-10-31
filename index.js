const express = require('express')
const fs = require('fs')

const Polybot = require("./poly.js");
const client = new Polybot()

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('The API is found at /api/v1 endpoint.');
});

app.get('/api/', (req, res) => {
  res.redirect('/api/v1');
});

app.get('/api/v1/', (req, res) => {
    res.send([
        '/api/v1/chat?input=requiredString&temperature=optionalFloat',
        '/api/v1/startingPhrase',
        '/api/v1/continue?input=requiredString&temperature=optionalFloat',
    ].join('\n'));
});

app.get('/api/v1/startingPhrase', (req, res) => {
    res.send(client.fromScratch());
});

app.get('/api/v1/chat', (req, res) => {
    try {
        var temperature = parseFloat(req.query.temperature || "1");
        if (!req.query.input) {
            res.send('No input provided');
        } else {
            res.send(client.fromInput(req.query.input,temperature));
        }
    } catch {
        res.send("Couldn't parse temperature")
    }
});

app.get('/api/v1/continue', (req, res) => {
    try {
        var temperature = parseFloat(req.query.temperature || "1");
        if (!req.query.input) {
            res.send('No input provided');
        } else {
            res.send(client.continue(req.query.input,temperature));
        }
    } catch {
        res.send("Couldn't parse temperature")
    }
});

app.listen(port, () => {
    console.log(`Polybot listening on port ${port}`);
});