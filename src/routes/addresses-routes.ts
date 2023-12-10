import express, { Request, Response, Router } from "express";
import { addressesRepo } from "../repo/addresses-repo";

export const addressesRouter = Router();

addressesRouter.get("/:id", (req: Request, res: Response) => {
  let idAdress = addressesRepo.getAddressesId(+req.params.id)
  if (!idAdress) {
    res.send(404);
  }
  res.send(idAdress);
});
