import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../model/user";

const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthRequest extends Request {
  user?: User;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  if(!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET!, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user as User;
    next();
  });
};  
