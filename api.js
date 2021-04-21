const axios = require("axios");

const api = axios.create({
  baseURL: process.env.AUTHENTICATE_URL,
});

module.exports = api;
