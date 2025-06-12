import { Request, Response, NextFunction } from "express";

const RequestsArray = {
  count: 0,
}

export function logsController(req: Request, res: Response, next: NextFunction){
  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;

  console.log(`Request #${++RequestsArray.count}: time: ${formattedDate}; type: ${req.method}; path: ${req.path}; body: ${JSON.stringify(req?.body)}`);
  next();
}