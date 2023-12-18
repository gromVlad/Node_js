//https://node-js-it-ink.onrender.com/
import bodyParser from "body-parser";
import express, { Request,Response } from "express";
import { addressesRouter } from "./routes/addresses-routes";
import { commentsRouter } from "./routes/products-routes";
const app = express()
const port = process.env.PORT || 5000;

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!");
});

app.use("/address", addressesRouter);
app.use("/products", commentsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

