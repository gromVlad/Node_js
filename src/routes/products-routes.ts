import express, { Request, Response, Router } from "express";
import { productsRepo } from "../repo/products-repo";

export const commentsRouter = Router()

commentsRouter.get("/", (req: Request, res: Response) => {
  let result = productsRepo.getAllProductWithTitle(req.query.title?.toString());
  res.send(result);
});

commentsRouter.get("/:id", (req: Request, res: Response) => {
  let product = productsRepo.getProductsId(+req.params.id);
  if (!product) {
    res.send(404);
  }
  res.send(product);
});


commentsRouter.delete("/:id", (req: Request, res: Response) => {
  let result = productsRepo.deleteProduct(+req.params.id);
  if (result) {
    return res.sendStatus(204);
  } else {
    return res.sendStatus(404);
  }
});

commentsRouter.post("/", (req: Request, res: Response) => {
  let newProduct = productsRepo.addProduct(req.body.title);
  res.status(201).send(newProduct);
});

commentsRouter.put("/:id", (req: Request, res: Response) => {
  let result = productsRepo.updateProduct(+req.params.id, req.body.title);
  res.send(result)
});