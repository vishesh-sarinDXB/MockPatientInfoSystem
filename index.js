const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const app = express();
const db = config.get('mongoURI');

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const routes = require('./route')(app);

const port = 5000;

const server = app.listen(port, () => console.log(`Server started on port: http://localhost:${port}`));

module.exports = server;