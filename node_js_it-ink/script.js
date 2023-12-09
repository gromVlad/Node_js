//____Simple express app with typescript and nodemon___//

// yarn init --yes
// yarn add express

//index.js
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  debugger;
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// node index.js
//автоматические видить изменения -  yarn add nodemon --dev(для разработки)
//yarn nodemon index.js

//для инспекции кода добовляем --inspect / далее иконка в консоли node
//yarn nodemon --inspect index.js

//добовляем ts
//yarn add typescript ts-node @types/node @types/express --dev

//создать дефолтный файл с настройками ts
//yarn tsc --init - создать файл конфигурационный ts

//компиляция yarn tsc чтобы получить итоговый файл в js
//tsconfig.json
//"rootDir": "./src"  - исходный файд
//"outDir": "./dist" - скомпилированный файл

//режим watcher для ts в реальном времени следит за файлами ts
//yarn tsc -w

//то есть одним компилятором следим за ts a nodemon смотрит уже за dist/index.js

//пишем скрипты для упрощения запуска проги
/* 
 "scripts": {
    "watch": "tsc -w",
    "dev": "nodemon --inspect dist/index.js"
  },
*/
//запускаем на разных консолях

//---------------------------------------------------------
//__02 - 1 - Deploy to Heroku for simple TS Express App__//
//Heroku - облочный сервер
//Связываем github и heroku

/* 
"scripts": {
    "watch": "tsc -w",
    "dev": "nodemon --inspect dist/index.js",
    "build":"tsc", -> для компиляиции на heroku без -w
    "start":"node dist/index.js" -> для компиляиции на heroku без nodemon
  },
*/

//создаем переменные окружения чтобы ссылся не на порт 5000 а на другие протоколы
//const port = process.env.POPT || 5000

//---------------------------------------------------------
//___03 - 1 - Express and REST API___//

//REST API
//express накатывает функциональность CRUD операции
//Разные типы запросов
//get - получить
//post - создать
//put - обновить
//delte - удалить

//query параметр /products?title=0 - дополнения к адресу
//ury параметр меняет саму систему роутинга

//https://node-js-it-ink.onrender.com/
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
const app = express();
const port = process.env.PORT || 5000;

const products = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];
const addresses = [
  { id: 1, value: "vlad" },
  { id: 2, value: "nikita" },
];

const parserMiddleware = bodyParser({});
//каждый запрос пройдет обработку через Middleware / он обработает под капотом файлы приходящие в том числе и post запрос от body
app.use(parserMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!");
});

app.get("/products", (req: Request, res: Response) => {
  //фильтрация по query параметру
  //http://localhost:5000/products?title=to => {"title": "tomato"}
  if (req.query.title) {
    let search = req.query.title.toString();
    res.send(products.filter((el) => el.title?.indexOf(search) > -1));
  } else {
    res.send(products);
  }
});

app.get("/products/:id", (req: Request, res: Response) => {
  let product = products.find((el) => el.id === +req.params.id);

  //возврощает статус код 404 send воспринимает цифры как статус ошибки
  if (!product) {
    res.send(404);
  }

  res.send(product);
});

app.get("/address/:id", (req: Request, res: Response) => {
  let idAdress = addresses.find((el) => el.id === +req.params.id);

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
    id: +new Date(),
    title: req.body.title,
  };
  products.push(newProduct);
  res.status(201).send(newProduct);
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
  if (product) {
    product.title = req.body.title;
    res.send(product);
  } else {
    res.send(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
