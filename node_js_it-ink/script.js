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

//------------------------------------------
//_____03 - 2 - Swagger_______//
//Тескт который описывает наш API
//Генерирует документацию автоматический на основании предложенного кода ( по определенным пояснительным коментарием)
//Выше расположены сам API с ее запросами а ниже расположены схемы (все объекты отписанные что ждет на выходе или на входе)
//Также есть разные формат документации по дефолту это документация имеет yaml формате json , есть редакторы которые позволяют в реальном времени изменить доку

//----------------------------------------------
//_______04 - Express Router_______//
//маршрутизация

//addresses-routes.ts
import express, { Request, Response, Router } from "express";

const addresses = [
  { id: 1, value: "vlad" },
  { id: 2, value: "nikita" },
];

export const addressesRouter = Router();

addressesRouter.get("/address/:id", (req: Request, res: Response) => {
  let idAdress = addresses.find((el) => el.id === +req.params.id);
  if (!idAdress) {
    res.send(404);
  }

  res.send(idAdress);
});

//index.ts
app.use("/addresses", addressesRouter);


//-------------------------------------------
//____05 - DataAccessLayer - Repositories__//
//архетиктура
//DataAccessLayer - код который общаеться с базой данной
//presentation layer <- business layer <- data access layer <- data

//addresses-repo.ts
const addresses = [
  { id: 1, value: "vlad" },
  { id: 2, value: "nikita" },
];

export const addressesRepo = {
  getAddressesId(id: number) {
    return addresses.find((el) => el.id === id);
  }
}

//addresses-routes.ts
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


//products-repo.ts
const products = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];

export const productsRepo = {
  getAllProductWithTitle(search: string | null | undefined) {
    if (search) {
      return products.filter((el) => el.title?.indexOf(search) > -1);
    } else {
      return products
    }
  },
  getProductsId(id: number) {
    return products.find((el) => el.id === id);
  },
  deleteProduct(id: number) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products.splice(i, 1);
        return true
      } else {
        return false
      }
    }
  },
  addProduct(title: string) {
    let newProduct = {
      id: +new Date(),
      title: title,
    };
    products.push(newProduct);
    return newProduct
  },
  updateProduct(id: number, title: string) {
    let product = products.find((el) => el.id === id);
    if (product) {
      product.title = title;
      return product
    } else {
      return 404
    }
  }
};

//products-routes.ts
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

//-------------------------------------------------------
//___06 - Express middleware, chain of responsibility___//
//промежуточный слой
//имеет значения последовательность

/* 
Паттерн "Цепочка" (или "Chain of Responsibility") относится к категории паттернов проектирования, которые используются для организации взаимодействия объектов. Он позволяет передавать запросы последовательно по цепочке потенциальных обработчиков, пока один из них не обработает запрос.
Основная идея паттерна в том, чтобы связать объекты в цепочку и передавать запрос от одного объекта к другому до тех пор, пока запрос не будет обработан или пока не достигнут конец цепочки. Каждый объект в цепочке представляет собой потенциального обработчика запроса и имеет ссылку на следующий объект в цепочке.
*/

//создаем промежуточный слой типо охраник
//...?token===123
const authGuard = (req: Request, res: Response, next: NextFunction) => {
  if (req.query.token === '123') {
    next();
  } else {
    res.send(404)
  }
}

//подсчет запросов
let countReq = 0
const requestCountFun = (req: Request, res: Response, next: NextFunction) => {
  countReq++
  next()
}

app.use(authGuard)
app.use(requestCountFun);


//-------------------------------------------------------
//____07 - 1 - input validation, express-validator____//
//все входящие потоки данных надо валидировать

// Пример использования middleware с Express Validator
app.post('/users', [
  body('name').notEmpty().withMessage('Имя обязательно'),
  body('email').isEmail().withMessage('Некорректный email'),
  body('password').isLength({ min: 6 }).withMessage('Пароль должен быть не менее 6 символов'),
], validateInput, (req, res) => {
  // Если валидация успешна, выполняется обработчик маршрута
  // ...
});

//validateInput.ts
export function validateInput(req: Request, res: Response, next: NextFunction) {
  // Проверка результатов валидации
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Если есть ошибки, возвращаем ответ с кодом ошибки и сообщением об ошибках
    return res.status(400).json({ errors: errors.array() });
  }

  // Если ошибок нет, передаем управление следующему middleware или обработчику маршрута
  next();
}

//products-routes.ts
//....
commentsRouter.post("/", validateInput, (req: Request, res: Response) => {
  let newProduct = productsRepo.addProduct(req.body.title);
  res.status(201).send(newProduct);
});

//---------------------------------
//__07 - 2 - Basic Authorization__//
//в каждый заголовок мы пишем определенный токен и данные
//кладем в определенном формате данные
//обычно логинимся один раз
//При basic авторизации отровляем при запросе каждый раз пароль и логин
//Basic_Login:pass -> зашифруем в base64 кодировку

//-----------------------------------------------------
//__08 - MongoDB, mongod and mongo shell, Studio 3T__//


