const rateLimit = require('express-rate-limit')
const express = require('express')
const cors = require('cors')
const fs = require('fs')

const Polybot = require("./poly.js");
const client = new Polybot()

const app = express();
const port = 3000;

const limiter = rateLimit({
	windowMs: 60 * 1000,
	max: 50,
	standardHeaders: false,
	legacyHeaders: true,
  message: 'You have been ratelimited.'
});

app.use(express.static('static'));
app.use(express.json());
app.use(limiter);
app.use(cors());

app.get('/', (req, res) => {
  res.send('The API is found at /api/v1 endpoint.');
});

app.get('/api/', (req, res) => {
  res.redirect('/api/v1');
});

app.get('/api/v1/', (req, res) => {
    res.json({
      "/chat": ['input', 'temperature'],
      "/continue": ['input', 'temperature'],
    });
});

app.post('/api/v1/chat', (req, res) => {
    try {
        var temperature = parseFloat(req.body.temperature || "1");
        if (!req.body.input) {
            res.send('No input provided');
        } else {
            res.send(client.fromInput(req.body.input,temperature));
        }
    } catch {
        res.send("Couldn't parse temperature")
    }
});

app.post('/api/v1/continue', (req, res) => {
    try {
        var temperature = parseFloat(req.body.temperature || "1");
        if (!req.body.input) {
            res.send('No input provided');
        } else {
            res.send(client.continue(req.body.input,temperature));
        }
    } catch {
        res.send("Couldn't parse temperature")
    }
});

app.get('/*', (req, res) => {
    res.send("Invalid route!")
});

app.post('/*', (req, res) => {
    res.send("Invalid route!")
});

app.listen(port, () => {
    console.log(`Polybot listening on port ${port}`);
});