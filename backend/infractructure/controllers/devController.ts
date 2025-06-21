import { Request, Response, NextFunction } from "express";
import { ErrorCode } from "../../core/errors/errorCodes";

export function devController(req: Request, res: Response, next: NextFunction){
  if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'development-docker') return next();

  res.status(403).json({
    error: {
      message: 'Feature for developers only',
      code: ErrorCode.DEVELOPER_FEATURE
    }
  });
  return;
}