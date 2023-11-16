//Node_js
//среды выполнения кода js вне веб браузера
//серверная технология которая позволяет выполнить код на сервере
//Переимущества
//- высокая популярность
//- один язык для фронт и бэк
//- открытый исходный код
//- большое количество внешних библиотек
//Node.js подходит для выполнения потоковых данных в реальном времени, API сервисы, умеет работать со смногими потоками
//Не лучший выбор для задач где требуеться большие ресурсы процесора такие как обработка видео, машинное обучения

//Отличие от веб браузера
//-глобальный объект global
//-нет взаимодействие с веб браузером
//-можно использывать все функции поддерживаемые node.js (не требуеться компиляция и конвертация)
//-есть доступ к файловой системе

//-------------
//___Установка ____
//кросплатформенный
//можно менять версионность с помощью nvm(node version manager). Который позволяет устанавливать и управлять различными версиями
//node --version

//---------------------
//___hello node.js____

//run code -> node name_file
console.log("hello"); //hello

//node -> запуск итерактивного инерпритатора. выход -> .exit

//.help -> получения помощи

//.__ -> другие команды break / clear / editor / exit / help / load / save

//также используем плагин code runner в vs code / [Done] exited with code=0 in 0.133 seconds -> code=0 - что ошибок не было

//--------------------
//____Краткий курс по JS___

//__переменные
let a = 20;
a = 20;
let b = 10;
b = false;

//PascalCase
//DB_PASSWORD
//camelCase

//__string / boolean / number / null / undefined / symbol / objects (ссылочный тип)

//__js динамический типизируемый язык
//лучше всегда объявлять переменные с помощью const

//__соединения строк
const hello = "hello";
const world = "world";
let res = `${hello} ${world}`; //hello world

//__объекты - ссылочный тип
const obj = {
  popular: "24",
  country: "minsk",
  getCountry() {
    return this.country;
  },
};
obj.getCountry();
console.log(); //тоже объект с методам log()

//__функции
function name() {
  console.log("hello");
}
name();

const arrFun = () => {
  console.log("hello");
};

const personOne = {
  name: "bob",
  age: 29,
};

function incrPerson(person) {
  person.age += 1;
  return person;
}
incrPerson(personOne);
console.log(personOne.age); //22

//колбэк функция
function printMyName() {
  console.log("vlad");
}
setTimeout(() => {
  printMyName();
}, 1000);

//__массивы
//упорядочные значения
const myArr = [1, 2, 3];
console.log(myArr); //[1,2,3]
console.log(myArr.length); //3
myArr[2] = 12;
console.log(myArr); //[ 1, 2, 12 ]
//pop() push() shift() unshift() map()...

//__операторы
//используеться в выражениях
// +  === != <= ! * / (оператор) a b (операнды) ! && || (логические) = (присваивание)
//унарные a++ ..
//бинарные - два оператора
//..spred

//__деструктаризация
const userProf = {
  name: "vlad",
  age: 24,
};
const { name, age } = userProf;
const fruits = ["apple", "banana"];
const [frOne, frTwo] = fruits;

//__тернарный оператор
let value = 11;
console.log(value >= 0 ? value : -value); //11

//__классы
class Comments {
  constructor(text) {
    this.text = text;
    this.votes = 0;
  }

  upvote() {
    this.votes += 1;
  }
}

//расширяем класс
class Extends extends Comments {
  info() {
    console.log("any info");
  }
}
const newComments = new Comments("hello");
newComments.upvote();
newComments.info();

//___promise
//отложенные действие,обещание получить результат в будущем
const myPromise = new Promise((res, rej) => {
  return res(1);
});

myPromise.then((res) => console.log(res)).catch((err) => console.error(err));

//fetch api
fetch("")
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

//async await
async function fetchData(url) {
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
const url = "https://hdrezka.co/";
fetchData(url).then((res = console.log(res)));

//____json
//формат обмена и хранения данный, все ключи это строки
JSON.parse(); //конвертация в js
JSON.stringify(); // конвертация в json

//------------------------
//____Как работает Node.js___

//однопоточный , благодоря асинхронным неблокирующим операциям он может обрабатывать несколько потоков.

//Пример блокирующей операций
//HTTP запрос -> сервер (поток) -> запрос на чтение -> база данных (пока сервер ожидает ответ от базы данных код далее не выполняеться)
//когда получили ответ поток уже разлокируеться

//Неблокирующие операции
//Поток при запросе не блокируеться, и мы можем на сервере выполнять другие задачи пока мы ожидаем ответа от сервера, операция чтения выполняються в фоновом режиме и приэтом другие операции продолжают выполняться в потоке

//Пример блокирущей операции
//fs  -модуль для работы с файлами
const fs = require("fs");
//readFileSyn - синхронно читаем данные в блокирующем формате
const data = fs.readFileSync("./test.txt", "utf-8"); //пока мы читаем данные в этой строке код далее не выполняеться
//после окончание чтения файла
console.log("file readind");
console.log("continue...");

//Пример неблокирущей операции
const fs = require("fs");
fs.readFile("./test.txt", "utf-8", (err, data) => {
  if (!err) {
    console.log("file readind");
  }
});
//выполниться до окончание чтение файла
console.log("continue...");

//--------------------
//__Libuv с циклом событий и пулом потоков__

//Libuv обеспечивает поддержку асинхронных неблокирующих операции, основные состовляющие части Event Loop (обрабатывает асинхронные колбэк функции вызова связанные с различными событиями) и Thread pool (используеться для обработки блокирующих операции)

//--------------------
//__Цикл событий__

//Event Loop
//Обработка событий происходит в цикле непрерывно
//Позволяет выполнять неблокирующие операции
//Event Loop - бесконечный цикл, в котором вызываеться колбэк функции, связанные с событиями
//Колбэки выполняються в основном потоке

//Thread pool
//асинхроное выполнения блокирующих операций
//по умолчанию можно выполнять 4 блокирующих операций, количество потоков можно увеличить до 1024 потоков (максимально допустимая)
//В этих потоках выполняються задачи операции ввода вывода, задачи создающие нагрузку на процессор
//Libuv использует операционную систему для выполнения задач, делегирование задач OS, если можно делегировать то она выполняеться OS, если нет то задача идет в Thread pool

//Например
//Thread pool -> база данных, сеть, файловая система, после завершения операций поподает в Event QUEUE
//Event QUEUE -очередь событий, туда попадают события после завершения определенной операций, типо ответа от базы данных,ответ по сети с удаленного сервера и далее эти события поподают в Event Loop и выполняються в зависемости от их очереди

//-----------------------
//____ Группы событий в цикле событий____
//Event Loop -> Timers (колбэки для истекших таймеров) -> pendind / I/O Events (колбэки, отложенный до следующей операции) -> idle,prepare (используються внутри node) -> poll (получить и выполнить колбэки) -> check (колбэки setimmediate) -> close (закрытие определенных действий) -> дальше продолжать ли цикл событий? -> если да то опять все повторяеться если нет то выход (как првило цикл продолжаеться)
//Сокращенный вариант Timers ->  I/O Events -> setimmediate -> close -> повторяеться или нет

//-------------
//__События nextTick и колбэки промисов___
//самый высокий приоритет
//позволет вызвать функции немедленно независемо на каком этапе циклы мы находимся т.к после каждого этапа выполнения цикла проверяет на наличие nextTick
//результат promise также будет вызвана немедленно на подобии nextTick

//----------------
//__События setImmediate___
//Вызывает на текущей или следующей итерации цикла событий
// приоритет ниже чем nextTick
setImmediate(() => {
  console.log("immediate");
});

//------------------
//__Блокирующие операции___
//Должны избегать блокирующие операции при разработке, если функция занимает много времени то события ожидают в очереди Event QUEUE
//!Код который мы пишем не должен занимать цикл событий слишком долго
//планировать приложения чтобы все операции были асинхронными неблокирущие действиями

//------------------
//___Практика - Цикл событий___
//сначало идет код -> console.log()
//далее Next tick
//Promises
//Timers
//I/O Events
//setimmediate
//close

//модули по id
const fs = require("fs");
const dns = require("dns");

//performance.now() метод который показывает время выполнения в мс
function info(text) {
  console.log(text, performance.now().toFixed(2));
}
console.log("Program start");

// Close events
//асинхронная запись в файл
//файл, данные, опции?, колбэк событие
fs.writeFile("./test.txt", "Hello Node.js", () => info("File written"));

// Promises
Promise.resolve().then(() => info("Promise 1"));

// Next tick
process.nextTick(() => info("Next tick 1"));

// setImmediate (Check)
setImmediate(() => info("Immediate 1"));

// Timeouts
setTimeout(() => info("Timeout 1"), 0);
setTimeout(() => {
  process.nextTick(() => info("Next tick 2"));
  info("Timeout 2");
}, 100);

// Intervals
let intervalCount = 0;
const intervalId = setInterval(() => {
  info(`Interval ${(intervalCount += 1)}`);
  if (intervalCount === 2) clearInterval(intervalId);
}, 50);

// I/O Events
//lookup - dns запрос, имя, (ошибка, адрес который вернет сервер,)
dns.lookup("localhost", (err, address, family) => {
  info("DNS 1 localhost");
  Promise.resolve().then(() => info("Promise 2"));
  process.nextTick(() => info("Next tick 3"));
});
console.log("Program end");
/* Program start
Program end
Next tick 1  115.25
Promise 1  115.57
Timeout 1  116.90
DNS 1 localhost  118.53
Next tick 3  118.85
Promise 2  119.56
Immediate 1  120.17
File written  121.09
Interval 1  154.85
Timeout 2  204.96
Next tick 2  205.42
Interval 2  206.79 */

//--------------------
//__Блокирование цикла событий____
let isRunning = true;

//до вызова этой функции мы не доходим
//2 итэрация цикла мы до ее не доходим
setTimeout(() => (isRunning = false), 0);

//не доходит до нее
process.nextTick(() => console.log("Next tick"));

//1 итэрация цикла
while (isRunning) {
  console.log("While loop is running...");
}
//While loop is running... - бесконечно

//----------------------
//___Цикл while без блокирования___
const fs = require("fs");
let isRunning = true;

setTimeout(() => (isRunning = false), 100);
process.nextTick(() => console.log("Next tick"));

function setImmediatePromise() {
  return new Promise((resolve, reject) => {
    //setImmediate() разрывает цикл событий чтобы мы перешли к другой итерации
    setImmediate(() => resolve());

    // если бы ло бы resolve просто то мы бы находились на одной итерации что и nextTick и поэтому также whileLoop был бы бесконечным
    // resolve()
  });
}

//сделали цикл не неприрывным а он ожидает результат определенного Promise
async function whileLoop() {
  while (isRunning) {
    console.log("While loop is running...");
    await setImmediatePromise();
  }
}

whileLoop().then(() => console.log("While loop ended"));
// While loop is running...
// Next tick
// While loop is running...
// While loop is running...
// ....
// While loop ended

//--------------------
//___Стек вызовов (call stack)___
//Цикл событйи ожидает пока код не завершиться
function thirdFun() {
  return 10;
}

function secondFun() {
  return thirdFun();
}

function firstFun() {
  return secondFun();
}
console.log(firstFun()); //10
//call stack
//thirdFun()
//secondFun()
//firstFun()
//10

//-------------------
//___Блокирование цикла событий в рекурсивной функции___
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55

setTimeout(() => console.log("Timeout"), 0);

//это функция синхронна и поэтому мы блокируем цикл пока не выполним ее
function fib(n) {
  if (n === 0 || n === 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

console.log(fib(40));
// 102334155
// Timeout

//------------------------------
//___ Функция fib без блокирования цикла событий__
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55

setTimeout(() => console.log("Timeout"), 0);

function fib(n) {
  return new Promise((resolve, reject) => {
    if (n === 0 || n === 1) {
      return resolve(n);
    }
    setImmediate(() =>
      Promise.all([fib(n - 1), fib(n - 2)]).then(([fib1, fib2]) =>
        resolve(fib1 + fib2)
      )
    );
  });
}
// Heap out of memory
fib(40).then((res) => console.log(res));
// Timeout
// 55
//если больше 40 то ошибка Heap out of memory  вышли за рамки памяти которые выделяються под программу

//----------------------------
//___Оптимизация функции fib_____
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55

setTimeout(() => console.log("Timeout"), 0);

//храним в кэшэ
const cache = new Map();

function fib(n) {
  return new Promise((resolve, reject) => {
    if (n === 0 || n === 1) {
      return resolve(n);
    }
    if (cache.has(n)) {
      return resolve(cache.get(n));
    }

    //setImmediat неблокирует цикл событий
    setImmediate(() =>
      fib(n - 1).then((fib1) =>
        fib(n - 2).then((fib2) => {
          cache.set(n, fib1 + fib2);
          resolve(fib1 + fib2);
        })
      )
    );
  });
}

fib(100000).then((res) => console.log(res));
// Timeout
// 102334155

//-------------------------
//__Поиск числа фибоначи без рекурсии___
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55
//код написан асинхронно но т.к. он хорошо оптимизирован он может работать на невысоко нагруженном приложений

function info(text) {
  console.log(text, performance.now().toFixed(2));
}

info("Program start");

setTimeout(() => info("Timeout"), 0);

function fib(n) {
  if (n === 0 || n === 1) {
    return n;
  }
  let fib1 = 0;
  let fib2 = 1;
  let sum;
  for (let i = 1; i < n; i++) {
    sum = fib1 + fib2;
    fib1 = fib2;
    fib2 = sum;
  }
  return sum;
}

console.log(fib(100000));

info("Program end");

// Program start 86.43
// 4.346655768693743e+208
// Program end 100.63
// Timeout 105.20

//--------------------------
//_______Модули______
//в node каждый файл являеться модулем
//Преимущества 
//- разделение на части
//- организация кода
//- разделения ответствености
//- упрощение поддержки приложения

//Характеристика модулей
//По умолчанию ни одна из переменных в модуле не доступна для импорта в других модулях
//Чтобы переменная стала доступна для импорта в других модулях ее необходимо эспортировать из модуля
//Для использование в опреедленном модуле переменные из других модулей их необходимо импортировать
//При импортировании переменных из других модулей их можно изменять

//Варианты модулей
//commonJS Modules require... (по умолчанию)
//ECMAScript Modules (ESM) import...

//Модули кэшыруеться в памяти для улучшения производительности приложения

//---------------------
//_commonJS Modules
//по умолчанию
module.exports // объект для экспортирования из модуля
require() //что хотим импротировать

//По умолчанию любой файл node явл. модулем commonJS
// module объект который доступен в любом таком файле
//module.exports содержит значения из модуля
//module.exports по умолчанию пустой объект
//переменная export - это копия module exports

//---------------------
//_Как устроен модуль commonJS
//каждый модуль автоматический оборачиваеться в анонимную функцию
//(function (export,require,module,_filename,_dirname){}) из которой мы и имеем доступ к module и т.д.

//проверка наличия анонимной функции
console.log(arguments.callee.toString());//(function (export,require,module,_filename,_dirname){})
//_filename - абсолютный путь
//module - объект (id,path,children...)
//_dirname - путь к папке
//export - пустой {} аналог module.export
//require - функия для импорта (можно опускать расширения если .js .json .node)

//--------------------
//_Экспорт из модуля
function printHello() {
  console.log('helloWorld');
}
//добовляем ключ со значением в объекте
module.exports.printHello = printHello

//the same
//лучше так не делать
module.exports.printHello = function () {
  console.log('helloWorld');
}

//переписываем значения module.exports
//можно так эспортировать да же одну функцию
module.exports = function () {
  console.log('helloWorld');
}

//aлиас module.exports
//exports то же самое как и module.exports (просто aлиас (ссылка))

//так нельзя эспортировать exports т.к она уже не будет ссылаться на тот же объект (то есть на module.export)
exports = function () {
  console.log('hello World');
}

//!Правило если эспортируем одно что-то то применяем module.exports 

//-------------------------
//_Функция require
//доступна везде по умолчанию
//для импорта переменных
//можноможно импортировать из встроенныйх или внешних модулей указывая имя модуля
//можно импортировать из модулей приложения, указывать путь к соответвующим файлам

//указываем имя встроенного или внешнего модуля
const fs = require('fs')

//импорт единтсвенного эспорта
//users.js
const users = [1, 2.3]
module.exports = users
//index.js
//если эспортируем один файл можно название писать любое
const usersArr = require('./users.js')

//--------------------------
//_Импорт нескольких переменных

//users.js
const URL = 'http...'
const USERNAME = 'admin'
const PASSWORD = 'strong_pass'

module.exports.URL = URL
module.exports.USERNAME = USERNAME
module.exports.PASSWORD = PASSWORD

//index.js
const { URL, USERNAME, PASSWORD } = require('./users.js')

//импорт функции
//utils,js
async function getData(url) {
  const res = await fetch(url)
  const data = await res.json()
  return data
}
module.exports = getData

//index.js
const getFun = require('./users.js')
getFun('http...').then((res) => console.log(res)).catch((err) => console.error(err))

//------------------------
//_module.exports практика

//multiple-exports.js
const myName = 'Bogdan';
const myHobbies = ['swimming', 'boxing', 'cycling'];
const myFavoriteNumber = 77;

console.log('Text from the multiple-exports CommonJS module');

module.exports.myName = myName;
exports.myHobbies = myHobbies;
exports.myFavoriteNumber = myFavoriteNumber;

//single -export.js
function greeting(name) {
  console.log('Hello', name);
}

// console.log(__filename);

module.exports = greeting;

// // DON'T DO THIS!
// exports = greeting;

//export-and-import.js
const { myName, myHobbies } = require('./multiple-exports.js');

const myFriendsName = 'Alice';

module.exports.myName = myName;
module.exports.myFriendsName = myFriendsName;
// property names could be different from the variable names
module.exports.myGreatHobbies = myHobbies;

//index.js
const { myName, myHobbies, myFavoriteNumber } = require('./multiple-exports.js');

//переменовываем название перменной myOtherName
const {
  myName: myOtherName,
  myFriendsName,
  myGreatHobbies,
} = require('./export-and-import.js');

const greetingFn = require('./my-modules/single-export.js');
// // DON'T USE ABSOLUTE PATHS
// const greetingFn = require('/Users/bogdan/Desktop/node/03-commonjs-modules/single-export.js');

// Imports from multiple-exports
console.log(myName);
console.log(myHobbies);
console.log(myFavoriteNumber);

// mutates array in the multiple-exports module!
myHobbies.push('climbing');

console.log(greetingFn);
greetingFn(myName);

console.log(myOtherName);
console.log(myFriendsName);
console.log(myGreatHobbies);
/* 
Text from the multiple-exports CommonJS module
Bogdan
[ 'swimming', 'boxing', 'cycling' ]
77
[Function: greeting]
Hello Bogdan
Bogdan
Alice
[ 'swimming', 'boxing', 'cycling', 'climbing' ] 
*/

//-------------------
//_Модули ES6
//export 
//import

//переход c commonJS на ES6
//изменить расширения файлов на mjs
//добавить "type":'module' в файле paskage.json

//Внутри модуля ES6 нет доступа к перменным module и т.д.

//---------------------------
//_Типы эспортов
//-именованные
//-экспорт по умолчанию
//-смешанные экспорты

//-------------------------
//_Именованный экспорт

function prh (){
  console.log('hello');
}
export { prh }//будет доступна в других модулях

//в начале файла
//указываем относительные а не абсолютные пути
import { prh } from "./hello.mjs";

//несколько переменных
function pr1() {
  console.log('hello');
}

function pr2() {
  console.log('hello');
}
export { pr1,pr2 }//будет доступна в других модулях

// это не объект а синтаксис ES6
import { pr1, pr2 } from "./hello.mjs";

//users.js
const URL = 'http...'
const USERNAME = 'admin'
const PASSWORD = 'strong_pass'

export { URL, USERNAME, PASSWORD }

//index.js
import { URL, USERNAME, PASSWORD } from "./hello.mjs";

//можно указывать экспорт непосредственно перед переменной
export function pr3() {
  console.log('hello');
}

//---------------------
//_Экспорт по умолчанию

function prh() {
  console.log('hello');
}
export default prh

//без скобок , название переменной может быть любым
import prFun from './hello.mjs'

//----------------
//_Опции импортов
//если импортируем много перемнных можно разбивать на разные строки, название должны совподать
//выборочный импорт переменных
//можно переменовывать переменные при импорте с помощью import {print as greet} from './...'
//можем выполнять из встроенных и внешних модулей  import fs from 'fs'; 
//также можно комбинировать и импортировать по умолчани и именованные экспорты 
//при импортировании встроенных модулей можно добовлять префикс node - import fs from 'node:fs'; (const fs = require('node:fs'))

//--------------
//_Практика ES6 модулей

//mixed-exports.mjs
const USERNAME = 'admin';
const PASSWORD = 'strong-password';
const DEFAULT_SERVER = 'http://localhost';

export default DEFAULT_SERVER;

export { USERNAME, PASSWORD };

//default-export.mjs
async function getData(url) {
  const res = await fetch(url);
  const posts = await res.json();
  return posts;
}

export default getData;

//inline-exports.mjs
export const humidity = 40;
export const isRaining = false;

//mixed-exports.mjs
const USERNAME = 'admin';
const PASSWORD = 'strong-password';
const DEFAULT_SERVER = 'http://localhost';

export default DEFAULT_SERVER;

export { USERNAME, PASSWORD };

//named-exports.mjs
const season = 'spring';
const temperature = 13;

export { season, temperature };

//index.mjs
import { season, temperature } from './named-exports.mjs';
import { isRaining, humidity } from './inline-exports.mjs';
import getDataFromServer from './default-export.mjs';
import DEFAULT_SERVER, {
  USERNAME as MY_USERNAME,
  PASSWORD as MY_PASSWORD,
} from './mixed-exports.mjs';

console.log(season);
console.log(temperature);

console.log(isRaining);
console.log(humidity);

getDataFromServer('https://jsonplaceholder.typicode.com/posts/1')
  .then((post) => console.log(post))
  .catch((err) => console.error(err));

console.log(DEFAULT_SERVER);
console.log(MY_USERNAME, MY_PASSWORD);
/* spring
13
false
40
http://localhost
admin strong-password
{
  userId: 1,
  id: 1,
  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\n' +
    'suscipit recusandae consequuntur expedita et cum\n' +
    'reprehenderit molestiae ut ut quas totam\n' +
    'nostrum rerum est autem sunt rem eveniet architecto'
} */

//------------------------------------
//____Встроенные модули в Node.js______
//fs events path http stream
//использовать официальную документацию

//---------------------
//_Модуль fs
//Синхронные и асинхроные функции взаимодействием с файлами
//Стили использование модуля
//-Callback API
//-Promise API
//-Synchronous API

//функции в модуле которые работают синхронна добовляеться _sync (readFileSync) асинхронные функции async (readFile)

//вариант с асинхронными функциями
const fs = require('fs')
fs.readFile('./file.txt','utf-8',(err,data) => {
  if (err){
    console.log(err);
  } else {
    console.log(data);
  }
})

//вариант с промисами
const fs = require('fs/promise')
fs.readFile('./file.txt', 'utf-8').then((data) => console.log(data)).catch((err) => console.error(err))

//синхронная
const fs = require('fs')
try {
  const data = fs.readFileSync('./file.txt', 'utf-8')
  console.log(data);
} catch (error) {
  console.log(error);
}

//----------------------
//_Запись в файл с помощью модуля fs

//асинхронная 
const fs = require('fs')

const dataToWrite = 'hello Node'
fs.writeFile('./file.txt',dataToWrite,(err) => {
  if (err){
    console.log(err);
  }
})

// promise и асинхроные функции также по примеру выше -//---//---

//-------------------------
//_Удаление файлов с помощью модуля fs

//асинхронная 
const fs = require('fs')

fs.unlink('./file.txt',(err) => {
  if (err) {
    console.log(err);
  }
  console.log('file deleted');
})

// promise и асинхроные функции также по примеру выше -//---//---

//-----------------------------
//_Практика модуля fs
const fs = require('fs');

fs.writeFile('./first.txt', 'First file text', (err) => {
  if (err) console.log(err);
  else {
    console.log('File first.txt was written');
    fs.appendFile('./first.txt', '\nOne more line', (err) => {
      if (err) console.log(err);
      else {
        console.log('Appended text to the first.txt file');
        fs.rename('./first.txt', './renamed-first.txt', (err) => {
          if (err) console.log(err);
          else console.log('File was renamed');
        });
      }
    });
  }
});
//'File first.txt was written'
//'Appended text to the first.txt file'
//'File was renamed'

//оптимизируем код чтобы не было постоянная вложеность друг в друга 
const fs = require('fs/promises');

fs.writeFile('./first.txt', 'First file text')
  .then(() => console.log('File first.txt was written'))
  .then(() => fs.appendFile('./first.txt', '\nOne more line'))
  .then(() => console.log('Appended text to the first.txt file'))
  .then(() => fs.rename('./first.txt', './renamed-first.txt'))
  .then(() => console.log('File was renamed'))
  .catch((err) => console.log(err));


//такой код не использовать т.к. синхронная операция
const fs = require('fs');
try {
  fs.writeFileSync('./first.txt', 'First file text');
  console.log('File first.txt was written');
  fs.appendFileSync('./first.txt', '\nOne more line');
  console.log('Appended text to the first.txt file');
  fs.renameSync('./first.txt', './renamed-first.txt');
  console.log('File was renamed');
} catch (error) {
  console.log(error);
}

//--------------------------
//__Модуль events___
//работа с событиями , создавать свои события, реагировать на них

//архетиктура node  основана на событиях
//встроенные модули например такие как fs генерирует события
//событие создаеться когда данные были прочитаны из файла или когда был получен новый запрос http-сервером
//в ответ на событие вызываеться колбэк функция, зарегистрированные колбэк функций
//Для одного события может быть несколько событий

//модуль events предостовляет класс eventmitter для работы с событиями в node.js,все объекты которые создают события являються экземплярами класса eventеmitter
const EventEmitter = require('events')

//cоздаем экземпляр класса
const myEmitter = new EventEmitter()

//создаем событие (слушителя события) / event listener
myEmitter.on('customEvents',() => {
  console.log("CustomEvents was emitted");
})

//вызываем метод
myEmitter.emit('customEvent')

//передача аргументов
myEmitter.on('newUser', (userName) => {
  console.log(userName);
})
myEmitter.emit('newUser','vlad')

//---------------------
//_Практика events

//index.js
import EventEmitter from 'events';

const myEmitter = new EventEmitter();

const timeoutListenerFn = (secondsQty) => {
  console.log(`Timeout event in ${secondsQty} seconds!`);
};

//также можно добовлять с помощью addListener... а не on
myEmitter.on('timeout', timeoutListenerFn);

setTimeout(() => myEmitter.emit('timeout', 1), 1000);
setTimeout(() => myEmitter.emit('timeout', 2), 2000);

//однократная реакция события once. 2 раз не сработает
myEmitter.once('singleEvent', () => {
  console.log('Single event occurred');
});

setTimeout(() => myEmitter.emit('singleEvent'), 500);
setTimeout(() => myEmitter.emit('singleEvent'), 1500);

// отключаем событие указывая обязательно ее функцию
setTimeout(() => myEmitter.off('timeout', timeoutListenerFn), 3000);
setTimeout(() => myEmitter.emit('timeout', 4), 4000);

/* 
Single event occurred
Timeout event in 1 seconds!
Timeout event in 2 seconds!
*/

//------------------------
//_Несколько слушателей для события

//multiple-listeners.mjs
import EventEmitter from 'events';

const myEmitter = new EventEmitter();

myEmitter.on('myEvent', () => {
  console.log('First event listener');
});

myEmitter.on('myEvent', () => {
  console.log('Second event listener');
});

myEmitter.on('otherEvent', () => console.log('Other event'));

// по дефолту 10 / меняем на другое число
myEmitter.setMaxListeners(25);

//текущее максимальное число событий
console.log(myEmitter.getMaxListeners());

//список событий
console.log(myEmitter.eventNames());

setTimeout(() => myEmitter.emit('myEvent'), 1000);

/* 
25
[ 'myEvent', 'otherEvent' ]
First event listener
Second event listener
 */

//----------------------
//_Практика - Запись в файл с помощью EventEmitter

//fs-events.mjs
import EventEmitter from 'events';
import fs from 'fs';

const fileEmitter = new EventEmitter();

const filePath = './first.txt';

fileEmitter.on('writeComplete', () => {
  console.log(`File ${filePath} was written`);
  fs.appendFile(filePath, '\nOne more line', () => {
    fileEmitter.emit('appendComplete');
  });
});

fileEmitter.on('appendComplete', () => {
  console.log(`Appended text to the ${filePath} file`);
  fs.rename(filePath, './renamed-first.txt', () => {
    fileEmitter.emit('renameComplete');
  });
});

fileEmitter.on('renameComplete', () => {
  console.log('File was renamed');
});

fs.writeFile(filePath, 'First file text', () => {
  fileEmitter.emit('writeComplete');
});

/*
 File ./first.txt was written
Appended text to the ./first.txt file
File was renamed
 */

//---------------------
//_Практика - Расширение EventEmitter в классе

//class-events.mjs
import EventEmitter from 'events';

class Post extends EventEmitter {
  constructor(author, text) {
    super();
    this.author = author;
    this.text = text;
    this.likesQty = 0;
    this.on('likePost', (username) => {
      console.log(`${username} liked your post!`);
    });
    this.on('error', (error) => {
      console.error(error);
    });
  }

  like(username) {
    if (!username) {
      return this.emit(
        'error', 
        new Error('No username in the like request!')
      );
    }
    this.likesQty += 1;
    this.emit('likePost', username);
  }
}

const myPost = new Post('Bogdan', 'My great post!');
myPost.like('alice');
setTimeout(() => myPost.like(), 1000);
setTimeout(() => myPost.like('alex'), 2000);;
//alice liked your post!
//No username in the like request!
//alex liked your post!

//-----------------------
//___Модуль path___
//позволяет работать с путями и папками
const path = require('path')

const linux = path.join('/user','node','app.js')// /usr/node/index.js
const winP = path.join('D:\\', 'node', 'app/js')// D:\node\index.js

//расчет абсолютного пути
const result = path.resolve('node','index.js')
// users/desktop/node/node/index.js - добавили node/index.js

//----------------------
//_Практика - Встроенный модуль path
const path = require('path');

const filePath = '/Users/bogdan/Desktop/node/index.js';
const textFilePath = '/Users/bogdan/Desktop/file.txt';
const relativePath = './node/movie.mov';
const directoryPath = './node/subfolder';

//абсолютный путь
console.log(path.isAbsolute(filePath)); // true
console.log(path.isAbsolute(relativePath)); // false

//вернет последнию часть пути
console.log(path.basename(filePath)); // index.js
console.log(path.basename(directoryPath)); // subfolder

//путь без названия файла
console.log(path.dirname(filePath)); // /Users/bogdan/Desktop/node
console.log(path.dirname(directoryPath)); // ./node

//получить абсолютный путь
console.log(path.resolve(relativePath)); // /Users/bogdan/Desktop/node/07-path/node/movie.mov

//получить расширения файла
console.log(path.extname(textFilePath)); // .txt
console.log(path.extname(relativePath)); // .mov
console.log(path.extname(directoryPath)); // ''

//распарсить путь в объект 
console.log(path.parse(filePath));
/* 
  root: '/',
  dir: '/Users/bogdan/Desktop/node',
  base: 'index.js',
  ext: '.js',
  name: 'index'
}
 */

const parsedPath = path.parse(filePath);
console.log(filePath);
console.log(path.join(parsedPath.dir, `renamed-${parsedPath.name}.mjs`));
// /Users/bogdan/Desktop/node/renamed-index.mjs

//------------------------
//___Moдуль http___
//позволяет создать сервер или отсылать запросы

const http = require('http')

//req - запрос ,res - ответ от сервера
//на любой запрос будем отсылать один и от же ответ
const server = http.createServer((req,res)=>{
  res.statusCode = 200
  res.setHeader('Content-Type','text/html')
  res.write('<h1>Hello</h1>')
  res.end()
})
//порт на ктором будет запущен сервер, бесконечно будет ожидать ответа от клиента
server.listen(3000)

//отправка запроса
const url = 'http...'

//асинхронный код
http.get(url, (res) => {
  let responseBody = ''

  //регистрируем слушателей / по частям записываем данные если data событие большое
  res.on('data', (chunk) => {
    responseBody += chunk
  })

  //как только все данные получены выполняем определенные действия
  res.on('end', ()=>{
    console.log(responseBody);
  })
})

//--------------------------
//_Практика

//comment-form.html
/* 
<body>
        <h1>Add a new comment</h1>
        <form action="/comments" method="post">
            <label for="id">Comment ID:</label>
            <input type="number" name="id" id="id" />

            <label for="author">Author:</label>
            <input type="text" name="author" id="author" />

            <label for="text">Text:</label>
            <textarea name="text" id="text" cols="30" rows="10"></textarea>

            <button type="submit">Submit Comment</button>
        </for
*/

//index.js
const http = require('http');
const {
  getHTML,
  getText,
  getComments,
  handleNotFound,
  postComment,
  getHome,
} = require('./handlers.js');

const PORT = 5000;

const server = http.createServer((req, res) => {
  console.log(req);//объект запроса с url, methods и т.д.
  if (req.method === 'GET' && req.url === '/') {
    return getHome(req, res);
  }
  if (req.method === 'GET' && req.url === '/html') {
    return getHTML(req, res);
  }
  if (req.method === 'GET' && req.url === '/text') {
    return getText(req, res);
  }
  if (req.method === 'GET' && req.url === '/comments') {
    return getComments(req, res);
  }
  if (req.method === 'POST' && req.url === '/comments') {
    return postComment(req, res);
  }

  handleNotFound(req, res);
});

server.listen(PORT, () => {
  console.log(`Server was launched on port ${PORT}`);
});

//data.js
const comments = [
  { id: 100, text: 'First comment', author: 'Bogdan' },
  { id: 526, text: 'Second comment', author: 'Alice' },
  { id: 724, text: 'Last comment', author: 'Bob' },
];

module.exports = comments;

//handlers.js
const fs = require('fs');
const qs = require('querystring');
const comments = require('./data.js');

//получаем html страницу
function getHome(req, res) {
  fs.readFile('./files/comment-form.html', (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Server error while loading HTML file');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    }
  });
}

function getHTML(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write('<html><body><div>');
  res.write('<h1>Greetings from the HTTP server!</h1>');
  res.write('</div></body></html>');
  res.end();
}

function getText(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('This is plain text');
}

function getComments(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(comments));
}

function postComment(req, res) {
  res.setHeader('Content-Type', 'text/plain');

  if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        //с помощью этого модуля преобразовываем строку в объект
        const comment = qs.parse(body);
        comments.push(comment);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        //по итогу получаем страницу с текстом и ссылкой на форму для нового коментария
        res.write('<h1>Comment data was received</h1>');
        res.write('<a href="/">Submit one more comment</a>');
        res.end();
      } catch (error) {
        res.statusCode = 400;
        res.end('Invalid Form data');
      }
    });
  } else if (req.headers['content-type'] === 'application/json') {
    let commentJSON = '';

    req.on('data', (chunk) => (commentJSON += chunk));

    req.on('end', () => {
      try {
        comments.push(JSON.parse(commentJSON));
        res.statusCode = 200;
        res.end('Comment data was received');
      } catch (error) {
        res.statusCode = 400;
        res.end('Invalid JSON');
      }
    });
  } else {
    res.statusCode = 400;
    res.end('Data must be in the JSON format or as form');
  }
}

function handleNotFound(req, res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Page not found!</h1>');
}

module.exports = {
  getHTML,
  getText,
  getComments,
  postComment,
  handleNotFound,
  getHome,
};

//------------------------
//____Moдуль stream___
// Потоки
//- потоки позволяет нам обрабатывать данные частями
//- потоки идеальные для работы с большими объемами данных, которое могут не поместиться а памяти одновременно
//- Можно прочитать файл частями что позволяет избежать чтения всего файла и записи его в памяти
//- потоки являються экземплярами класса EventEmitter

//без потоков если у нас есть источник данных то нам необходимо загрузить ввсе перед началом обработки
//с потоками разбиваем данные на части и по очереди из загружаем по мере их загрузки не перезагружая память

//Типы потока
//Readable - для чтения
//Writable - для записи
//Duplex - как для чтения так и для записи
// Transform - преобразует входные даннные (трансформирует в другой поток)

//запись файла с помощью потока
const fs = require('fs')

const writeStream = fs.createWriteStream('./f.txt')
writeStream.write('this is data')
writeStream.write('write to the file using stream')
writeStream.write('\n')
writeStream.write('streams the great')
writeStream.end()

//чтения файла с помощью потока
const fs = require('fs')

const readStream = fs.createReadStream('./f.txt','utf8')
readStream.on('data', (dataChunk) => {
  console.log(dataChunk);
})
readStream.on('end', () => {
  console.log('file reading complete');
})
readStream.on('error', (err) => {
  console.log(err);
})

//метод pipe может перенаправлять один поток в другой поток
readableStream.pipe(writableStream)

//цепочка вызовов - позволяет возвращать целевой поток что позволяет снова вызвать метод pipe
stream1.pipe(stream2).pipe(stream3)

//-------------------------
//_Копирование файлов с помощью потоков
const fs = require('fs')

const readStream1 = fs.createReadStream('./f.txt', 'utf8')
const writeStream1 = fs.createWriteStream('./f_copy.txt')

readStream1.pipe(writeStream1)

writeStream1.on('close',() => {
  console.log('file copy completed');
})

//--------------------------
//_Создание transform потока
const stream = require('stream')

const upperCaseStream = new stream.Transform({

  //часть данных, кодировка, объект
  transform(chunk,encoding,callback) {
    const upperCase = chunk.toString().toUpperCase()

    //должен быть вызван с ошибкой или преобразованной частью потока вместо null вписываем ошибку если она есть
    callback(null,upperCase)
  }
})

//использование transform потока
//stdin - стандартный ввод поток для чтения (когда введет данные из терминала), далее трансформируем, после выводим в терминал
process.stdin.pipe(upperCaseStream).pipe(process.stdout)
// в консоли пишем hello -> выводит в консоль HELLO

//-----------------------
//_Практика - Передача файла клиенту по http в потоке

//index.html
/* 
     <body>
        <h1>Streamed HTML file from the HTTP server</h1>
    </body>
*/

//http-stream-file.mjs
import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
  const filePath = './files/index.html';
  // With streams
  if (req.url === '/' && req.method === 'GET') {
    const readStream = fs.createReadStream(filePath);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    readStream.pipe(res);
  }
  // Without streams. We read entire file and then send it to the client
  if (req.url === '/no-stream' && req.method === 'GET') {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error reading file on server');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  }
});

server.listen(5000, () => {
  console.log('Server is listening at port 5000');
});

//-----------------------------
//_Чтение из стандартного ввода в потоке
import { Transform } from 'stream';
import fs from 'fs';

// Pipe to file
const filePath = './files/stdin-dump.txt';
const writeStream = fs.createWriteStream(filePath);

//создали файл с текстом который ввели в консоли терминала
process.stdin.pipe(writeStream);

//process - объект который доступен везде,stdin - возврощает поток который подключаеться к стандартному вводу в терминале - ввод данных / stdout - вывод данных в терминал / stderr -стандартный вывод ошибок
// Pipe to stdout
process.stdin.pipe(process.stdout)

//трансформируем поток
const upperCaseStream = new Transform({
  //оригинальные данные chunk / типо буффера - временная хранилище данных в оперативной памяти, также когда нужно работать с бинарными данными массив байт (спец кодировка) поэтому конвертируем буффер обратно в строку
  //с помощью callback передаем уже измененные данные - cb / null означает что ошибки не возникла
  transform: function (chunk, encoding, cb) {
    const upperCased = chunk.toString().toUpperCase();
    cb(null, upperCased);
  },
});

const reverseStream = new Transform({
  transform(chunk, encoding, cb) {
    const arrayOfChars = chunk.toString().split('');
    const lastChar = arrayOfChars.pop();
    const reversed = arrayOfChars.reverse().concat(lastChar).join('');
    cb(null, reversed);
  },
});

//цепочка -> можем перенаправлять один поток в другой поток тем самым трансформируя наши данные введенные из терминала по итогу получим измененный результат
process.stdin.pipe(upperCaseStream).pipe(reverseStream).pipe(process.stdout);

//-----------------------
//_Практика - Аргументы программы Node.js
//Программа которая будет создавать файлы и записывать вних текстовый строки использя потоки, передадим название файла и количество строк
//node createfile.js(путь у нашему файлу с кодом) text.txt(название файла) 1000(количество строк)

//create-file.mjs
// How to run program: node createfile.mjs <filename> <linesQty>
import fs from 'fs';
import path from 'path';

//process.argv - массив с четырьмя элементами которые мы ввели в консоли (аргументы)

if (!process.argv[2] || !process.argv[3]) {
  console.log('Filename and lines qty must be supplied as arguments');
  process.exit(0);
}

const fileName = process.argv[2];
const linesQty = parseInt(process.argv[3]);
if (isNaN(linesQty)) {
  console.log('Lines qty must be a number');
  process.exit(0);
}

const writeStream = fs.createWriteStream(path.join('./files', fileName));

console.log('Start', performance.now());

for (let i = 1; i <= linesQty; i++) {
  writeStream.write(
    `This is a line number ${i} in the automatically generated file\n`
  );
}
console.log('End', performance.now());
setTimeout(() => console.log('Timeout', performance.now()), 0);

writeStream.end(() => {
  console.log(
    `Automatically generated file ${fileName} with ${linesQty} lines was created!`
  );
});
//third.txt
//This is a line number 1 in the automatically generated file ...

//---------------------
//_Практика - Копирование файла с помощью потока

//copy-file-in-stream.mjs
import fs from 'fs';

const fileName = './files/fifth.txt';
const copiedFileName = './files/fifth-copy.txt';

const readStream = fs.createReadStream(fileName);
const writeStream = fs.createWriteStream(copiedFileName);

readStream.pipe(writeStream);

readStream.on('end', () => console.log('Read stream ended'));
writeStream.on('finish', () => console.log('File was copied'));
writeStream.on('close', () => console.log('Write stream closed'));

//'Read stream ended'
//'File was copied'
//'Write stream closed'

//---------------------
//_Практика - Копирование папки с файлами в другую папку с помощью потоков

//copy-files-in-folder.mjs
import fs from 'fs';
import path from 'path';

const sourceDir = './files';
const destinationDir = './copied-files';

//проверка что такая папка существует
if (!fs.existsSync(sourceDir)) {
  console.warn(`Source dir ${sourceDir} doesn't exist!`);
  console.log('Exiting...');
  process.exit(0);
}

//если папка есть то удаляем папку
if (fs.existsSync(destinationDir)) {
  //recursive - позволит удалить все папки внутри рекурсивно 
  fs.rmSync(destinationDir, { recursive: true });
}

//создаем
fs.mkdirSync(destinationDir);

fs.readdir(sourceDir, (err, fileNames) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  //получаем массив с файлами которые лежат в этой папке
  console.log(fileNames)
  console.log('Start', performance.now());
  fileNames.forEach((fileName, index) => {
    //путь к файлу который мы копируем
    const sourceFilePath = path.join(sourceDir, fileName);

    //путь куда мы копируем
    const destinationFilePath = path.join(
      destinationDir,
      `${index + 1}. ${fileName}`
    );

    const readFileStream = fs.createReadStream(sourceFilePath);
    const writeFileStream = fs.createWriteStream(destinationFilePath);

    readFileStream.pipe(writeFileStream);

    writeFileStream.on('finish', () => {
      console.log(`File ${fileName} was copied`);
    });
  });
  console.log('End', performance.now());
});

//./files/ first.txt ... -> ./copied-files/1. first.txt
//File ... was copied
//End

//-------------------------------------
//__NPM - Менеджер пакетов в Node.js___//
//Node Package Manager

//Публичный репозиторий для пакетов Node.js
//Утилита командной строки для установки NPM пакетов
//На сайте npm.com можно найти все пакеты достпуные и информацию о них
//проверка версиии npm --version

//------------------------------------
//_Файл package.json
//файл в формате json содержащий метаданные о проекте node.js
//обычно paskage.json создаеться в корневой папке проекта
//Он содержит метаданные такие как имя проекта и т.д.
//Позволяет идентифицировать проект а также управлять зависемостями проекта
// {
//     "name": "npm-first-project",
//     "version": "1.0.0",
//     "description": "My first NPM project",
//     "main": "index.js",
//     "scripts": {
//         "start": "node index.js",
//         "dev": "nodemon index.js",
//         "test": "jest"
//     },
//     "keywords": [
//         "npm"
//     ],
//     "author": "Bogdan",
//     "license": "ISC",
//     "dependencies": {
//         "express": "^4.18.2"
//     },

        //список зависемостей
//     "devDependencies": {
//         "jest": "^29.4.3",
//         "nodemon": "^2.0.21"
//     }
// }

//создание npm init
//создание без предложения ввести данные с клавитатуры npm init -y
//установка пакетов npm install ___ /  добовляеться в папку node_modules

//------------------------
//_Инициализация нового проекта с помощью NPM

//перейти в папку проекта
//code . - перейти в новое окно редактора
//npm init
//ввести данные (entry points : -> главный файл это важно при опубликовании пакетов на npm)
//enter для пропуска

//---------------------------
//_Семантические версии

//4.18.1
//основная версия , минорная версия, патч версия
//обновление версии:
//основная версия - критические изменения или обновления (4.18.1 -> 5.0.0)
//Минорная версия - добовления нового функционала с сохранением предыдущей (4.18.1 -> 4.19.0)
//патч версия - внесение небольших изменений с сохранением предыдущего функционала (4.18.1 -> 4.18.2)

//---------------------------
//_Допустимые версии, обновление и удаление NPM пакетов

//Указание приемлемых обновлений пакетов
//^4.18.1 -> допускаються минорные и патч версии обновления пакетов например 4.20.0
//~4.18.1 -> допускаються патч версии обновления пакетов например 4.18.7
//4.18.1 -> только конкретные версии

//удалить пакет
//npm uninstall __

//установить глобально / осторожно устанавливать т.к. засоряет компьютер
//npm install -g __

//посмотреть список установленных глобально пакетов
//npm list -g

//--------------------------
//_Файл package-lock.json

//установить все зависемости - npm install

//c помощью package-lock.json файла понимаем именно точную версию пакета

/*
  ...
 "node_modules/which": {
  точная версия
  "version": "2.0.2",
    "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
        "dev": true,

        также могут быть зависемоти пакетов от других пакетов и т.д.
        "dependencies": {
          "isexe": "^2.0.0"
        },

  "bin": {
    "node-which": "bin/node-which"
  },
  "engines": {
    "node": ">= 8"
  }
},
 */

//-----------------------------
//_Папка node_modules
//папки содержит отдельные npm пакеты, цепочки зависемостей
//добовляем node_modules в gitignore 

//---------------------------
//_Обновление и удаление NPM пакетов

//npm uninstall ___
//npm install ___@1.9.2 - уставновить определенную версию пакета
//npm update ___ обновляет в зависемости от указаного правила версии пакета ^ ~
//npm install ___@latest - последнию доступную версию пакета
//npm install ___@next - последнию демо версию пакета не стабильную

//---------------------------
//_Зависимости для процесса разработки (devDependencies)

//npm install --save-dev ___ - только для разработки и в package.json установиться отдельные devDependencies (--save-dev аналог -D) / в package-lock.json добовляеться "dev":true
//npm install --only=prod - установить приложения в режиме production без пакетов в devDependencies

// {
//   "devDependencies": {
//     "jest": "^29.4.3",
//   },
// }

//-----------------------------
//_Скрипты NPM
// "scripts": {
//  "start": "node index.js",
//   "dev": "nodemon index.js",
//    "test": "jest"
// },

//node index.js
const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello from Express!!!!');
});

app.listen(3000);

//mult.js
function mult(a, b) {
  return a * b;
}
module.exports = mult;

//mult.test.js
const mult = require('./mult.js');

test('should multiply 5 and 10 and return 50', () => {
  expect(mult(5, 10)).toBe(50);
});

//npm start -> запуск приложения по адресу node index.js ("start": "node index.js")
//npm run dev -> запуск приложения по адресу nodemon index.js ("dev": "nodemon index.js")
//npm test -> "test": "jest"

//--------------------------
//_Разница между npm install и npm ci

//установить именно те версии которые нужно в соответствии с package.json и с package-lock.json т.к. по умолчанию с npm install  может докручивать версии при необходимости
//npm ci 

//npm install -> может изменять package-lock.jsos и package.json, медленее работает, есть папка node_modules есть то заново не создаеться, использкеться для установки отдельных пакетов

//npm ci - не изменяет package-lock.jsos и package.json ,быстрее работает, папка node_modules создаеться всегда, не используеться для установки отдельных пакетов

//---------------------------
//____Переменные среды____//
process.env // объект с переменными среды , название как константы которые не меняються пока программа работает

//Добавление переменных среды с помощью dotenv пакета

//.env
DB_USERNAME = 'admin'
DB_PASSWOR = 346546
DB_URL = '127.12....'

//index.js
require('dotenv').config();
console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_URL);

//------------------------
//____Express____//
//Фреймворк для nodejs
//Упрощает создание веб приложений и API
//Прост в изучении
//Публичная npm библиотека
//очень популярен

//npm install express

const express = require('express')

const PORT = 3000
const app = express()

app.get('/',(req,res) =>{
  res.send('<h1>Hello</h1>')
})

app.listen(PORT, () => {
  console.log('app is listening on port 3000');
})

//------------------------------
//_Создание веб сервера c express
const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Response from Express'));

app.listen(5000, () => console.log('Server was started on port 5000'));

//----------------------------
//__Роутинг в приложении Express__//
//Определяет как сервер отвечает на разные запросы клиентов

//настройка роутинга
//методы / путь / функция которая вызываеться при подключений, можно добовлять несколько обработчиков
app.httpMethods(requestPath,handerFN)

//-------------------------
//_Несколько обработчкиков запроса

//multiple-handlers / index.js
const express = require('express');

const app = express();

//чтобы перейти ко второй функции нужно вызвать next()
const firstHandler = (req, res, next) => {
  console.log('first handler');
  next();
};
const secondHandler = (req, res) => {
  console.log('second handler');
  res.send('Response from Express');
};

app.get('/', firstHandler, secondHandler);

app.listen(5000, () => console.log('Server was started on port 5000'));

//------------------------
//_Несколько маршрутов в Express /  параметры маршрутов

//вместо :userId модет быть любой id
app.get('/users/:userId', (req,res) => {
  console.log(req.params);//userId:'234'
  console.log(req.params.userId);//234
})

//цепочка http методов
app
  //путь указываем в одном месте
  .route('/users')
  .get((req,res) => {
    res.send('get req at / users path')
  })
  .post((req, res) => {
    res.send('post req at / users path')
  })

//обычно маршруты кидаем в отдельный модуль
//userd.js
const express = require('express')
export const userRouter = express.Router()
userRouter.get('/',(req,res) => {
  //code
})

//app.js
const express = require('express')
const usersRouter = require('./rotes/userd.js')

const app = express()
app.use('/users', usersRouter)

//----------------------
//_Практика - Express маршруты
//функции отдельно, пути отдельно, далее все пути совмещаем , также используем use для уменьшение длины путей

//controllers/comments.js
const getCommentsHandler = (req, res) => {
  res.send('Get comments route');
};

const getSingleCommentHandler = (req, res) => {
  res.send(`Get comment route. CommentId ${req.params.commentId}`);
};

const postCommentsHandler = (req, res) => {
  res.send('Post comments route');
};

const deleteSingleCommentHandler = (req, res) => {
  res.send(`Delete comment route. CommentId ${req.params.commentId}`);
};

module.exports = {
  getCommentsHandler,
  getSingleCommentHandler,
  postCommentsHandler,
  deleteSingleCommentHandler,
};

//controllers/users.js
const getUsersHandler = (req, res) => {
  res.send('Get users route');
};

const getSingleUserHandler = (req, res) => {
  res.send(`Get user route. UserId ${req.params.userId}`);
};

const postUsersHandler = (req, res) => {
  res.send('Post users route');
};

module.exports = {
  getUsersHandler,
  getSingleUserHandler,
  postUsersHandler,
};

//controllers/root.js
const getRootHandler = (req, res) => {
  res.send('Get root route');
};

module.exports = { getRootHandler };

//commets.js
const express = require('express');
const {
  getCommentsHandler,
  postCommentsHandler,
  getSingleCommentHandler,
  deleteSingleCommentHandler,
} = require('../controllers/comments');

const router = express.Router();

router.get('/', getCommentsHandler);
router.post('/', postCommentsHandler);
router.get('/:commentId', getSingleCommentHandler);
router.delete('/:commentId', deleteSingleCommentHandler);

module.exports = router;

//users.js
const express = require('express');
const {
  getUsersHandler,
  postUsersHandler,
  getSingleUserHandler,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsersHandler);
router.post('/', postUsersHandler);
router.get('/:userId', getSingleUserHandler);

module.exports = router;

//root.js
const express = require('express');
const { getRootHandler } = require('../controllers/root');

const router = express.Router();

router.get('/', getRootHandler);

module.exports = router;

//index.js
const express = require('express');
const commentsRouter = require('./comments.js');
const usersRouter = require('./users.js');
const rootRouter = require('./root.js');

const router = express.Router();

//use  работает по не точному пути да же если будет например comments/id... то все равно будет работать но такие пути как get и т.д. работают только по точному совпадению
router.use('/comments', commentsRouter);
router.use('/users', usersRouter);
router.use('/', rootRouter);

module.exports = router;

//app.js
const express = require('express');
const router = require('./routes.js');

const app = express();

app.use(router);//("/",router) - можно не добовлять / все равно будут отпровляться запросы

app.listen(5000, () => console.log('Server was started on port 5000'));

//--------------------------------
//___Паттерн программирования MVC___//
//Model View controller

//Model отвечает за взаимодействия с базой данных, интерфейс взаимодействия , сохраняем целостность т.к. все взаимодействия реализовано через модель
// View видимый для пользователя интерфейс (презентационная часть)
//Сontroller отвечает за всю логику взаимодействия модели с видами (посредник)
//Каждую базу данных следует структурировать согласно паттерну MVC

//DB (база данных где храняться определенные документы и т.д.) <--> model(user,comments,post - эти модели позволяют абстрагироваться от непосредственного взаимодействия с DB) <--> Сontroller(вся логика взаимодействия клиента и сервера, Routes - маршруты как часть контролера ) <--> View(мы создаем видимую часть приложения)

//--------------------------
//_Middleware функции в Express
//Функция которая выполняеться в процессе обработки запроса и отправки ответа
//Может быть несколько таких функций
//порядок следование важен

//Запрос от клиента (request) -> Middleware_1 (в самом вверху приложения, 3 параметр next) -> Middleware_2 (next) -> Middleware_3

//Что может делать функция Middleware:
// - любая функция Middleware может дать ответ клиенту
// - выполнять любой код
// - изменять объекты request / response
// - вызвать следующую функцию Middleware

//Middleware функция должна либо вызвать следующую функцию либо заверщить цикл запрос-ответ
function logger (req,res,next) {
  console.log('hello');
  next()
}
//использование , можно использовать множество подключений
app.use(logger)

//использование анонимной функций, можно не создавать отдельно / не рекомендуеться так делать , следует помещать Middleware в отдельную папку
app.use((req, res, next) => {
  console.log('hello');
  next()
})

//---------------------------
//_Практика - Добавление middleware функций
import express from 'express';

const app = express();

const Logger = (req, res, next) => {
  console.log(req.method, req.path); // get , /
  next()
}

app.use(Logger,(req, res) => {
  console.log(req.body);
  return res.send('This is express server');
});

app.listen(5000, () => console.log('server is listening at port 5000'));

//---------------------------
//_Логирование с помощью morgan
import express from 'express';
//можно логировать информацию о запросах клиента (получить дату запроса, метод, путь, протокол, код ответа от сервера и т.д.),внутри реализован next
import morgan from 'morgan';

const app = express();

// logs info about request
app.use(morgan('tiny'));

app.use((req, res) => { 
  console.log(req.body);
  return res.send('This is express server');
});

app.listen(5000, () => console.log('server is listening at port 5000'));

//-------------------------
//_Парсинг JSON от клиента без middleware
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'));

app.use((req,res,next) => {
  let data = ''
  req.on('data',(chunk) => (data += chunk))
  req.on('end', () => console.log(data))
  next()
})

app.use((req, res) => {
  return res.send('This is express server');
});

app.listen(5000, () => console.log('server is listening at port 5000'));

//---------------------------
//_Парсинг JSON от клиента с помощью middleware
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'));

app.use((req, res, next) => {
  let data = ''
  req.on('data', (chunk) => (data += chunk))
  req.on('end', () => {
    const parseJSON = JSON.parse(data)
    req.body = parseJSON
  })
  next()
})

//не получаем body т.к next получаем быстрее и поэтому req.body = parseJSON уже происходит после
app.use((req, res) => {
  console.log(req.body);//undefined
  return res.send('This is express server');
});

app.listen(5000, () => console.log('server is listening at port 5000'));

//чтобы работала надо функцию next() перенести внутрь логики 'end'
req.on('end', () => {
  const parseJSON = JSON.parse(data)
  req.body = parseJSON
  next()
})

app.use((req, res) => {
  console.log(req.body);//{...}
  return res.send('This is express server');
});

//также вместо всего этого кода можем использовать специальный метод делает то же самое
/* 
app.use((req, res, next) => {
  let data = ''
  req.on('data', (chunk) => (data += chunk))
  req.on('end', () => {
    const parseJSON = JSON.parse(data)
    req.body = parseJSON
  })
  next()
})
*/
//middleware функция
app.use(express.json());

//----------------------------
//_Парсинг формы от клиента без middleware
import express from 'express';
import morgan from 'morgan';
import qs from 'querystring';

const app = express();

app.use(morgan('tiny'));

app.use(express.json());

app.use((req, res, next) => {
  console.log(req);
  console.log(req.header['content-type']);//application/x-www-form-urlencoded
  if (req.header['content-type'] === 'application/x-www-form-urlencoded'){
    let data = ''
    req.on('data', (chunk) => (data += chunk.toString()))
    req.on('end', () => {
      console.log(data);//name=VLad&isInst=true&hobbies=cycling&hobbies=swimming
      const parseFormData = qs.parse(data)
      console.log(parseFormData);
      /* 
      {
        name:"Vlad",
        isInst:true,
        hobbies:[swimming,cycling]
      }
      */
      req.body = parseFormData
      next()
    })
  } else {
    next()
  }
})

app.use((req, res) => {
  console.log(req.body);//{}
  return res.send('This is express server');
});

app.listen(5000, () => console.log('server is listening at port 5000'));

//-------------------------
//_Парсинг формы от клиента с помощью middleware
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'));

app.use(express.json());

//то же самое только с помощью функции middleware который выполняет парсинг
// app.use((req, res, next) => {
//   console.log(req);
//   console.log(req.header['content-type']);//application/x-www-form-urlencoded
//   if (req.header['content-type'] === 'application/x-www-form-urlencoded') {
//     let data = ''
//     req.on('data', (chunk) => (data += chunk.toString()))
//     req.on('end', () => {
//       console.log(data);//name=VLad&isInst=true&hobbies=cycling&hobbies=swimming
//       const parseFormData = qs.parse(data)
//       console.log(parseFormData);
//       /* 
//       {
//         name:"Vlad",
//         isInst:true,
//         hobbies:[swimming,cycling]
//       }
//       */
//       req.body = parseFormData
//       next()
//     })
//   } else {
//     next()
//   }
// })
//extended: true - использовать внешний модуль
app.use(express.urlencoded({ extended: true }));

app.use((req, res) => {
  console.log(req.body);//{}
  return res.send('This is express server');
});

app.listen(5000, () => console.log('server is listening at port 5000'));

//по итогу получаем данные в зависемости что приходит запрос по форме или json,все они middleware и могут работать по цепочке
import express from 'express';
import morgan from 'morgan';

const app = express();

// logs info about request
app.use(morgan('tiny'));
// converts JSON to JS Object in POST, PUT, PATCH requests
app.use(express.json());
// convets form data to JS Object in POST, PUT, PATCH requests
app.use(express.urlencoded({ extended: true }));

app.use((req, res) => {
  console.log(req.body);
  return res.send('This is express server');
});

app.listen(5000, () => console.log('server is listening at port 5000'));


//-----------------------------
//__Создание мини приложения(фронтенд и бэк)__//

//npx - можно скачать однократно приложения

//backend/ app.mjs
import express from 'express';
import morgan from 'morgan';

//мы работаем на разных хостах и чтобы наше приложения работало нам нужно использовать cors
import cors from 'cors';

const app = express();

// logs info about request
app.use(morgan('tiny'));

// converts JSON to JS Object in POST, PUT, PATCH requests

app.use(express.json());
// convets form data to JS Object in POST, PUT, PATCH requests

app.use(express.urlencoded({ extended: true }));

// используем cors для всех запросов
app.use(cors());

app.use((req, res) => {
  const personData = {
    name: 'Vlad',
    isInstructor: true,
  };
  console.log(req.body);
  return res.json(personData);
});

app.listen(5000, () => console.log('server is listening at port 5000'));

//frontend/... /App.js

function App() {
  const [person, setPerson] = useState();

  useEffect(() => {
    fetch('http://127.0.0.1:5000')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPerson(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      {person && (
        <>
          <h1>{person.name}</h1>
          <h2>{person.isInstructor ? 'Instructor' : 'Student'}</h2>
        </>
      )}
    </div>
  );
}
export default App;


