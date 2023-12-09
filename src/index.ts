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
//каждый запрос пройдет обработку через Middleware / он обработает под капотом файлы приходящие в том числе и post запрос от body
app.use(parserMiddleware)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!");
});

app.get('/products', (req:Request, res:Response) => {
  //фильтрация по query параметру
  //http://localhost:5000/products?title=to => {"title": "tomato"}
  if (req.query.title) {
    let search = req.query.title.toString();
    res.send(products.filter((el) => el.title?.indexOf(search) > -1));
  } else {
    res.send(products);
  }
})

app.get('/products/:id', (req:Request, res:Response) => {
  let product = products.find((el) => el.id === +req.params.id);

  //возврощает статус код 404 send воспринимает цифры как статус ошибки
  if (!product) {
    res.send(404);
  }

  res.send(product);
})

app.get("/address/:id", (req: Request, res: Response) => {
   let idAdress = addresses.find((el) => el.id === +req.params.id );

   //возврощает статус код 404 send воспринимает цифры как статус ошибки
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

//post наличие body запроса
app.post("/products", (req: Request, res: Response) => {
  let newProduct = {
    id:+(new Date()),
    title:req.body.title
  }
  products.push(newProduct)
  res.status(201).send(newProduct)
});
/* 
{
  "id": 1702130606839,
  "title": "hello"
}
*/

//put - update
//можем отправить все изменения с телом запроса но обычно кидаем все в url
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


