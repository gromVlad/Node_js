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
const { myName, myHobbies } = require('./multiple-exports');

const myFriendsName = 'Alice';

module.exports.myName = myName;
module.exports.myFriendsName = myFriendsName;
// property names could be different from the variable names
module.exports.myGreatHobbies = myHobbies;

//index.js
const { myName, myHobbies, myFavoriteNumber } = require('./multiple-exports');

//переменовываем название перменной myOtherName
const {
  myName: myOtherName,
  myFriendsName,
  myGreatHobbies,
} = require('./export-and-import');

const greetingFn = require('./my-modules/single-export');
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
//



