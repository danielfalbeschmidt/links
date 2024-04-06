const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors module

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the cors middleware
app.use(cors());

app.get('/health', (req, res) => {
    res.send('Server is running and healthy');
});

app.post('/submit', (req, res) => {
  const { url } = req.body;
  console.log('Received URL:', url);

  let trimmedUrl = url.replace(/(^\w+:|^)\/\//, '');
  trimmedUrl = trimmedUrl.split('/')[0];

  res.json({ id: 1, name: 'linkki', originalUrl: url, shortUrl: 'http://localhost:3001/'+trimmedUrl});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
