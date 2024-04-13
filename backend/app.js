const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors module

const {redirectToOriginalUrl} = require('./controllers/links');

const linkRouter = require('./routes/links');

const app = express();

app.use(express.json());
app.use(bodyParser.json());


app.get('/health', (req, res) => {
    res.send("OK");
});

app.get('/:shortUrl', redirectToOriginalUrl);

app.use(cors());


app.use('/api/links', linkRouter);

module.exports = app;