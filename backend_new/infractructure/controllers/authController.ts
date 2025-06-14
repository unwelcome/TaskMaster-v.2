import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { ErrorCode } from "../../core/errors/errorCodes";
import { AuthRequest } from "../../common/interfaces";

export function authController(req: Request, res: Response, next: NextFunction){
  try{
    const authorizationHeader = req.headers['authorization'];
  
    //If no token -> locked
    if(!authorizationHeader) {
      res.status(423).json({
        error: {
          message: 'Missign auth token',
          code: ErrorCode.MISSING_TOKEN
        }
      });
      return;
    }

    const token = authorizationHeader.split(' ')[1];

    if(token === ''){
      res.status(423).json({
        error: {
          message: 'Missign auth token',
          code: ErrorCode.MISSING_TOKEN
        }
      });
      return;
    }

    const secretKey = process.env.JWT_SECRET;

    if(!secretKey){
      res.status(500).json({
        error: {
          message: 'Missing secret key',
          code: ErrorCode.INTERNAL_SERVER_ERROR
        }
      });
      return;
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if(err){
        if(err instanceof TokenExpiredError){
          res.status(401).json({
            error: {
              message: 'Token expired',
              code: ErrorCode.TOKEN_EXPIRED
            }
          });
          return;
        }
        res.status(400).json({
          error: {
            message: 'Token error',
            code: ErrorCode.INVALID_TOKEN
          }
        });
        return;
      }

      if(!decoded){
        res.status(401).json({
          error: {
            message: 'Token payload is empty',
            code: ErrorCode.INVALID_TOKEN
          }
        });
        return;
      } 
        
      (req as AuthRequest).token = decoded;
      next();
    });
    
  }catch(err){
    res.status(500).json({
      error: {
        message: 'Internal server error while parsing token',
        code: ErrorCode.INTERNAL_SERVER_ERROR
      }
    });
  }
}