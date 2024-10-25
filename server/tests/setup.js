const request = require('supertest');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = { request, app };
