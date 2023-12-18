import express, { Request, Response, Router } from "express";
import { productsRepo } from "../repo/products-repo";
import { validateInput } from "../midleWeareInput/validateInput";

export const commentsRouter = Router()

commentsRouter.get("/", async (req: Request, res: Response) => {
  let result = await productsRepo.getAllProductWithTitle(req.query.title?.toString());
  res.send(result);
});

commentsRouter.get("/:id",async (req: Request, res: Response) => {
  let product = await productsRepo.getProductsId(+req.params.id);
  if (!product) {
    res.send(404);
  }
  res.send(product);
});


commentsRouter.delete("/:id",async (req: Request, res: Response) => {
  let result = await productsRepo.deleteProduct(+req.params.id);
  if (result) {
    return res.sendStatus(204);
  } else {
    return res.sendStatus(404);
  }
});

commentsRouter.post("/",validateInput, async (req: Request, res: Response) => {
  let newProduct = await productsRepo.addProduct(req.body.title);
  res.status(201).send(newProduct);
});

commentsRouter.put("/:id",validateInput,async (req: Request, res: Response) => {
  let result = await productsRepo.updateProduct(+req.params.id, req.body.title);
  res.send(result)
});