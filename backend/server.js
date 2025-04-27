const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers/router.js');
const path = require('path');

const app = express();
const PORT = 8080;

// Проверка NODE_ENV
console.log('NODE_ENV:', process.env.NODE_ENV);

// Middleware для парсинга JSON
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

//роутинг  
app.use('/api', router);

// Отдача статики (собранного фронтенда)
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/Talker/dist');
  app.use(express.static(frontendPath));

  // Все остальные запросы отправляем на index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});