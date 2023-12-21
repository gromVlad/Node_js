//__Базовые типы
let a: number = 5;
let b: string = "sts";

let names: string[] = ["vlad", "sveta"];
let namesN: number[] = [2, 3];

//кортежи - ограниченной длины, определенного типа
let tup: [number, string] = [24, "dfdf"];

let e: any = 3; // any лучше не использовать

let arr: any[] = [3, "ff", true];

function f1(params: string): string {
  return params;
}

names.map((x: string) => x);

//? необязательный тип
function coord(coord: { lat: number; long?: number }) {}

//----------------
//__Union типы
let universal: number | string = 5;

function print(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

function helloUser(user: string | string[]) {
  if (Array.isArray(user)) {
    user.map((el) => console.log(el));
  } else {
    console.log(user);
  }
}

//----------------------
//___Interfaces и Types

type CoordType = { lat: number; long: number };

interface ICoord {
  lat: number;
  long: number;
}

type Unic = number | string;

function coords(coord: ICoord) {}

//__interface
interface Animal {
  name: string;
}

interface Dog extends Animal {
  tail?: boolean;
}

const dog: Dog = {
  name: "adolf",
  tail: true,
};

//можно дополнять (merge между собой) в  типах того нельзя
interface Cat {
  name: string;
}

interface Cat {
  tail: true;
}

//__type
type Animal2 = {
  name: string;
};

type Dog2 = Animal2 & {
  tail?: boolean;
};

//Всегда использовать interface

//------------------------
//__Литеральные типы
//позволяют задавать некий ограниченный набор аргументов

const a1 = "sdf";
let b1: "hi" = "hi";

type direction = "left" | "right";
function move(direction: direction): -1 | 1 | 0 {
  switch (direction) {
    case "left":
      return -1;
    case "right":
      return 1;
    default:
      return 0;
  }
}

interface IConnection {
  host: string;
  port: number;
}
function connect(connect: IConnection | "default") {}

const req = {
  host: "",
  protocol: "https" as "https", //ограничиваем (из обычной строки делаем строковый литерал)
};
function connect2(host: string, protocol: "http" | "https") {}
connect2(req.host, req.protocol);

let v: any = 5;
let j = v as number; //<number>v - так лучше не писать

//---------
//__Enum
//ограниченая структура

//при const присутствует в коде в виде занчения
const enum Direction {
  left = "left",
  Right = "right",
}
Direction.left; //left

//--------------
//__Generics
//универсально работают с типами
//помогают выдерживать принцип DRY в коде

interface HasLength {
  length: number;
}

function log<T extends HasLength, K>(obj: T, arr: K[]): K[] {
  console.log(obj.length);
  console.log(arr.length);
  return arr;
}

log<{ length: number }, number>({ length: 5 }, [1, 2]);

interface IUser {
  name: string;
  age?: number;
  bid: <T>(sum: T) => boolean;
}

function bid<T>(sum: T) {
  return true;
}

//-------------------
//__Классы

class Coord {
  lat: number;
  long: number;

  //доступен в исходном классе и наследуемом классе но недоступен в instance класса(new Coord(),new MapLocation())
  protected test() {}

  compute(dis: number, newLat: number): number {
    return 0;
  }

  constructor(lat: number, long: number) {
    this.lat = lat;
    this.long = long;
  }
}
const points = new Coord(2, 4);

class MapLocation extends Coord {
  _name: string;

  constructor(lat: number, long: number, name: string) {
    super(lat, long);
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(newStr: string) {
    this._name = newStr;
  }

  //явно override (переопределить) метод родителя у себя
  override compute(dis: number, newLat: number): number {
    console.log(this._name);
    return 0;
  }
}

//___

//абстракция описывающая желаемое поведение
interface LogerService {
  log: (s: string) => void;
}

class Logger implements LogerService {
  //можно явно указать что он публичный метод
  public log(s: string) {
    console.log(s);
  }

  //закрытый метод для наследников
  private error() {}
}
//приватные могут быть и методы и свойства
//private - ограничиваеться scope своего класса

//__

class MyClass {
  //можем обратиться без инициализации
  static a = 1;

  //также есть статические блоки
  static {}
}
MyClass.a; //1

//классы могут принемать дженерик
class MyCl<T> {
  a: T;
}
const a3 = new MyCl<string>();
a3.a; // являеться строкой

//__

//в abstract класе не можем создать instance класса / только для создание других классов
abstract class Base {
  print(s: string) {
    console.log(s);
  }

  //также можно создать отдельный метод абстрактным который дальше так же нужно реализовать в созданном классе
  abstract error(error:string): void;
}

class BaseExtends extends Base {
  error(s:string){
  };
}

//__
//расширения классов

class Animal {
  name:string
  
}

class Dog {
  name:string
  tails:boolean
}

//более сужаем класс
const puppy: Animal = new Dog()

//-----------------------------------
//__Другие типы и возможности__//

let r = 'hello'
if (typeof r === 'string') {}
let n: typeof r

//keyof берем ключи
type Coords = {
  lat :number,
  long:number
}
type P = keyof Coords // lat| long
let h: P = "lat"

//void - ничего не вовзрощает / a!.toUpperCase() - говорим что a точно будет
function logs(a :string | null):void {
  a?.toUpperCase()
}

//---------------------------------
//___App__//

//app.ts
import express, { Express } from "express";
import { Server } from "http";
import { ExeptionFilter } from "./errors/exeption.filter";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;
  userController: UserController;
  exeptionFilter: ExeptionFilter;

  constructor(
    logger: LoggerService,
    userController: UserController,
    exeptionFilter: ExeptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.exeptionFilter = exeptionFilter;
  }

  useRoutes() {
    this.app.use("/users", this.userController.router);
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init() {
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  }
}

//logger
import { Logger } from "tslog";

export class LoggerService {
  public logger: Logger;

  constructor() {
    this.logger = new Logger({
      displayInstanceName: false,
      displayLoggerName: false,
      displayFilePath: "hidden",
      displayFunctionName: false,
    });
  }

  log(...args: unknown[]) {
    this.logger.info(...args);
  }

  error(...args: unknown[]) {
    // отправка в sentry / rollbar
    this.logger.error(...args);
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
}

//route.interface.ts;
import { NextFunction, Request, Response, Router } from "express";

export interface IControllerRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, "get" | "post" | "delete" | "patch" | "put">;
}

//base.controller.ts
import { Response, Router } from "express";
import { LoggerService } from "../logger/logger.service";
import { IControllerRoute } from "./route.interface";
export { Router } from "express";

export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: LoggerService) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T) {
    res.type("application/json");
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T) {
    return this.send<T>(res, 200, message);
  }

  public created(res: Response) {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);
      const handler = route.func.bind(this);
      this.router[route.method](route.path, handler);
    }
  }
}

//users.controller.ts
import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { LoggerService } from "../logger/logger.service";

export class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      { path: "/register", method: "post", func: this.register },
      { path: "/login", method: "post", func: this.login },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, "ошибка авторизации", "login"));
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "register");
  }
}

//exeption.filter.interface.ts
import { NextFunction, Request, Response } from "express";

export interface IExeptionFilter {
  catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}

//http-error.class.ts
export class HTTPError extends Error {
  statusCode: number;
  context?: string;

  constructor(statusCode: number, message: string, context?: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.context = context;
  }
}

//exeption.filter.ts
import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../logger/logger.service";
import { IExeptionFilter } from "./exeption.filter.interface";
import { HTTPError } from "./http-error.class";

export class ExeptionFilter implements IExeptionFilter {
  logger: LoggerService;
  constructor(logger: LoggerService) {
    this.logger = logger;
  }
  catch(
    err: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof HTTPError) {
      this.logger.error(
        `[${err.context}] Ошибка ${err.statusCode}: ${err.message}`
      );
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(`${err.message}`);
      res.status(500).send({ err: err.message });
    }
  }
}

//main.ts
import { App } from "./app";
import { ExeptionFilter } from "./errors/exeption.filter";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";

async function bootstrap() {
  const logger = new LoggerService();
  const app = new App(
    logger,
    new UserController(logger),
    new ExeptionFilter(logger)
  );
  await app.init();
}

bootstrap();

//--------------------------
//__Dependency Injection__//

//__Разбор DI и IOC
//в аpp будем использовать не конкретный логер а просто описание интерфейса нужного тоесть подходящая реализация

import { Logger } from "tslog";

export interface ILogger {
  logger: unknown;
  log: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
}

//__Декораторы
//разрешение использование декораторов поменять разрешение на true в конфиге

//Декоратор класса
function myClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    newProperty = "Это новое свойство";
    newMethod() {
      console.log("Это новый метод");
    }
  };
}

@myClassDecorator
class MyClass {
  constructor(public name: string) {}
}

const obj = new MyClass("Объект");
console.log(obj.name); // Вывод: Объект
console.log(obj.newProperty); // Вывод: Это новое свойство
obj.newMethod(); // Вывод: Это новый метод

//Декоратор метода:
function myMethodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log("До выполнения метода");
    const result = originalMethod.apply(this, args);
    console.log("После выполнения метода");
    return result;
  };
  return descriptor;
}

class MyClass {
  @myMethodDecorator
  myMethod() {
    console.log("Это мой метод");
  }
}

const obj = new MyClass();
obj.myMethod();
// Вывод:
// До выполнения метода
// Это мой метод
// После выполнения метод

//Декоратор параметра
function myParameterDecorator(target: any, propertyKey: string | symbol, parameterIndex: number) {
  console.log(`Декорирование параметра ${propertyKey} с индексом ${parameterIndex}`);
}

class MyClass {
  myMethod(@myParameterDecorator param: string) {
    console.log(`Значение параметра: ${param}`);
  }
}

const obj = new MyClass();
obj.myMethod("Значение параметра");
// Вывод:
// Декорирование параметра myMethod с индексом 0
// Значение параметра: Значение параметра

//Декоратор свойства
function myPropertyDecorator(target: any, propertyKey: string) {
  let value = target[propertyKey];
  const getter = function () {
    console.log(`Чтение свойства ${propertyKey}`);
    return value;
  };
  const setter = function (newValue: any) {
    console.log(`Установка свойства ${propertyKey} со значением ${newValue}`);
    value = newValue;
  };
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class MyClass {
  @myPropertyDecorator
  myProperty: string = "Значение свойства";
}

const obj = new MyClass();
console.log(obj.myProperty); // Вывод: Чтение свойства myProperty, Значение свойства
obj.myProperty = "Новое значение";
console.log(obj.myProperty); // Вывод: Чтение свойства myProperty, Новое значение

//__Metadata Reflection
//Метаданные представляют собой дополнительную информацию о классах, методах, свойствах и других элементах программы
@Reflect.metadata("customKey", "Custom Value")
class MyClass {}

const metadata = Reflect.getMetadata("customKey", MyClass);
console.log(metadata); // Вывод: Custom Value

//__Внедряем InversifyJS
//сохроняем все в контейнер а потом просто берем и использем его
//дальше можно обращаться с любого места в приложении к ним

//types.ts
export const TYPES = {
  Application: Symbol.for("Application"),
  ILogger: Symbol.for("ILogger"),
  UserController: Symbol.for("UserController"),
  ExeptionFilter: Symbol.for("ExeptionFilter"),
};

//main.ts
import { Container } from "inversify";

const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<App>(TYPES.Application).to(App);
const app = appContainer.get<App>(TYPES.Application);
app.init();

//подключаем их
//logger.service.ts
import { injectable } from 'inversify';

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger;
}

//users.controller.ts
@injectable()
export class UserController extends BaseController {
	constructor(
		//logger: LoggerService
    //если бередаем что то в конструкторе то можем брать с контейнера
		@inject(TYPES.ILogger) private loggerService: ILogger
	) {
		super(logger);
  }
}