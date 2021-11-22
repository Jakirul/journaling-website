const express = require('express');
const app = express()
const cors = require('cors');
const postRoute = require('./controllers/postRoute.js')
app.use(express.json());
app.use(cors())
app.use('/', postRoute)


module.exports = app;

