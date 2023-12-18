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

