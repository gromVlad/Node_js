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
console.log('hello');//hello

//node -> запуск итерактивного инерпритатора. выход -> .exit

//.help -> получения помощи

//.__ -> другие команды break / clear / editor / exit / help / load / save

//также используем плагин code runner в vs code / [Done] exited with code=0 in 0.133 seconds -> code=0 - что ошибок не было

//--------------------
//____Краткий курс по JS___

//__переменные
let a = 20
a = 20
let b = 10
b = false

//PascalCase 
//DB_PASSWORD
//camelCase

//__string / boolean / number / null / undefined / symbol / objects (ссылочный тип)

//__js динамический типизируемый язык
//лучше всегда объявлять переменные с помощью const

//__соединения строк
const hello = 'hello'
const world = 'world'
let res = `${hello} ${world}`//hello world

//__объекты - ссылочный тип
const obj = {
  popular: '24',
  country: 'minsk',
  getCountry() {
    return this.country
  }
}
obj.getCountry()
console.log();//тоже объект с методам log()

//__функции
function name() {
  console.log('hello');
}
name()

const arrFun = () => {
  console.log('hello');
}

const personOne = {
  name: 'bob',
  age: 29
}

function incrPerson(person) {
  person.age += 1
  return person
}
incrPerson(personOne)
console.log(personOne.age);//22

//колбэк функция
function printMyName() {
  console.log('vlad');
}
setTimeout(() => {
  printMyName()
}, 1000);

//__массивы
//упорядочные значения
const myArr = [1, 2, 3]
console.log(myArr);//[1,2,3]
console.log(myArr.length);//3
myArr[2] = 12
console.log(myArr);//[ 1, 2, 12 ]
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
  age: 24
}
const { name, age } = userProf
const fruits = ['apple', 'banana']
const [frOne, frTwo] = fruits

//__тернарный оператор
let value = 11
console.log(value >= 0 ? value : - value);//11

//__классы
class Comments {
  constructor(text) {
    this.text = text
    this.votes = 0
  }

  upvote() {
    this.votes += 1
  }
}

//расширяем класс
class Extends extends Comments {
  info() {
    console.log('any info');
  }
}
const newComments = new Comments('hello')
newComments.upvote()
newComments.info()

//___promise
//отложенные действие,обещание получить результат в будущем
const myPromise = new Promise((res, rej) => {
  return res(1)
})

myPromise.then(res => console.log(res)).catch(err => console.error(err))

//fetch api
fetch('').then(res => console.log(res)).catch(err => console.error(err))

//async await
async function fetchData(url) {
  try {
    const res = await fetch(url)
    return res.json()
  } catch (error) {
    console.error(error);
  }
}
const url = "https://hdrezka.co/"
fetchData(url).then(res = console.log(res))

//____json
//формат обмена и хранения данный, все ключи это строки
JSON.parse() //конвертация в js
JSON.stringify() // конвертация в json

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
const fs = require('fs')
//readFileSyn - синхронно читаем данные в блокирующем формате
const data = fs.readFileSync('./test.txt', 'utf-8')//пока мы читаем данные в этой строке код далее не выполняеться
//после окончание чтения файла
console.log('file readind');
console.log('continue...');

//Пример неблокирущей операции
const fs = require('fs')
fs.readFile('./test.txt', 'utf-8', (err, data) => {
  if (!err) {
    console.log('file readind');
  }
})
//выполниться до окончание чтение файла
console.log('continue...');

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
  console.log('immediate');
})

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
const fs = require('fs');
const dns = require('dns');

//performance.now() метод который показывает время выполнения в мс
function info(text) {
  console.log(text, performance.now().toFixed(2));
}
console.log('Program start');

// Close events
//асинхронная запись в файл
//файл, данные, опции?, колбэк событие
fs.writeFile('./test.txt', 'Hello Node.js', () => info('File written'));

// Promises
Promise.resolve().then(() => info('Promise 1'));

// Next tick
process.nextTick(() => info('Next tick 1'));

// setImmediate (Check)
setImmediate(() => info('Immediate 1'));

// Timeouts
setTimeout(() => info('Timeout 1'), 0);
setTimeout(() => {
  process.nextTick(() => info('Next tick 2'));
  info('Timeout 2');
}, 100);

// Intervals
let intervalCount = 0;
const intervalId = setInterval(() => {
  info(`Interval ${(intervalCount += 1)}`);
  if (intervalCount === 2) clearInterval(intervalId);
}, 50);

// I/O Events
//lookup - dns запрос, имя, (ошибка, адрес который вернет сервер,)
dns.lookup('localhost', (err, address, family) => {
  info('DNS 1 localhost');
  Promise.resolve().then(() => info('Promise 2'));
  process.nextTick(() => info('Next tick 3'));
});
console.log('Program end');
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
//__




