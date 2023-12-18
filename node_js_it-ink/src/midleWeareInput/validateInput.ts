import { validationResult } from "express-validator";
import express, { NextFunction, Request, Response } from "express";

export function validateInput(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
