const express = require('express');
require('dotenv').config({path: '../.env'})
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routers/router.js');

const app = express();
const PORT = process.env.PORT || 8080;

// Проверка NODE_ENV
console.log('NODE_ENV:', process.env.NODE_ENV);
// console.log(`
//   SERVER:
//   host: ${process.env.NODE_ENV === 'production' ? process.env.POSTGRES_HOST : 'localhost'},\n
//   port: ${process.env.POSTGRES_PORT},\n
//   database: ${process.env.POSTGRES_DB},\n
//   user: ${process.env.POSTGRES_USER},\n
//   password: ${process.env.POSTGRES_PASSWORD}`);

//Middleware CORS
app.use(cors());
// Middleware для парсинга JSON
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

//роутинг  
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});