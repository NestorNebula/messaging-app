const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));

module.exports = { request, app };