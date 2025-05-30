const express = require('express');
require('dotenv').config({path: '../.env'})
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routers/router.js');

const app = express();
const PORT = process.env.PORT || 8080;

// Проверка NODE_ENV
console.log('NODE_ENV:', process.env.NODE_ENV);

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