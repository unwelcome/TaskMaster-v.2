import express, {Express, Request, Response} from "express";
const app:Express = express();
const PORT = 8000;

app.get('/', (req:Request, res:Response) => {
  res.status(200).send('Express + TS works perfectly');
});

app.listen(PORT, () => {
  console.log(`Backend is listen on port ${PORT}`);
});