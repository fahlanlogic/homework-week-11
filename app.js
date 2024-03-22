require('dotenv').config();
const express = require('express');
const router = require('./routers');
const errorHandler = require('./middlewares/error.handler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);

// JALANKAN APP JIKA BUKAN ENVIRONMENT TEST / AGAR PORT TIDAK KONFLIK


module.exports = app;
