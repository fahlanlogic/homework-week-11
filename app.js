require('dotenv').config();
const express = require('express');
const router = require('./routers');
const errorHandler = require('./middlewares/error.handler');

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);

// JALANKAN APP JIKA BUKAN ENVIRONMENT TEST / AGAR PORT TIDAK KONFLIK
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

module.exports = app;
