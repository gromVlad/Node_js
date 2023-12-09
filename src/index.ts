//https://node-js-it-ink.onrender.com/
import bodyParser from "body-parser";
import express, { Request,Response } from "express";
const app = express()
const port = process.env.PORT || 5000;

const products = [{id:1,title:'tomato'}, {id:2,title:"orange"}]
const addresses = [
  { id: 1, value: "vlad" },
  { id: 2, value: "nikita" },
];

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!");
});

app.get('/products', (req:Request, res:Response) => {
  if (req.query.title) {
    let search = req.query.title.toString();
    res.send(products.filter((el) => el.title?.indexOf(search) > -1));
  } else {
    res.send(products);
  }
})

app.get('/products/:id', (req:Request, res:Response) => {
  let product = products.find((el) => el.id === +req.params.id);

  if (!product) {
    res.send(404);
  }

  res.send(product);
})

app.get("/address/:id", (req: Request, res: Response) => {
   let idAdress = addresses.find((el) => el.id === +req.params.id );
   if (!idAdress) {
     res.send(404);
   }

   res.send(idAdress);
});

app.delete("/products/:id", (req: Request, res: Response) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === +req.params.id) {
      products.splice(i, 1);
      return res.sendStatus(204);
    }
  }
  return res.sendStatus(404);
});

app.post("/products", (req: Request, res: Response) => {
  let newProduct = {
    id:+(new Date()),
    title:req.body.title
  }
  products.push(newProduct)
  res.status(201).send(newProduct)
});

app.put("/products/:id", (req: Request, res: Response) => {
  let product = products.find((el) => el.id === +req.params.id);
  if (product){
    product.title = req.body.title;
    res.send(product);
  } else {
    res.send(404)
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


