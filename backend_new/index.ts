import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env'});

import express from "express";
import cors from "cors";
import router from "./router";


const app = express();
const PORT = process.env.PORT || 8000;

// Проверка NODE_ENV
console.log('NODE_ENV:', process.env.NODE_ENV);

//Use cors
app.use(cors());
//JSON body parse
app.use(express.json());
//User router
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Backend is listen on port ${PORT}`);
});