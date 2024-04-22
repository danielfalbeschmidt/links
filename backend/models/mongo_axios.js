const axios = require('axios');
const MONGO_API_URL = 'http://localhost:48934'; // links/mongo_api/port.py

const mongoAxios = axios.create({
  baseURL: MONGO_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

module.exports = mongoAxios;
