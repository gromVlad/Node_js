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
const obj ={
  popular:'24',
  country:'minsk',
  getCountry(){
    return this.country
  }
}
obj.getCountry()
console.log();//тоже объект с методам log()

//__функции
function name(){
  console.log('hello');
}
name()

const arrFun = () => {
  console.log('hello');
}

const personOne = {
  name:'bob',
  age:29
}

function incrPerson (person){
  person.age += 1
  return person
}
incrPerson(personOne)
console.log(personOne.age);//22

//колбэк функция
function printMyName(){
  console.log('vlad');
}
setTimeout(() => {
  printMyName()
}, 1000);

//__массивы
//упорядочные значения
const myArr = [1,2,3]
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
  name:"vlad",
  age:24
}
const {name,age} = userProf
const fruits = ['apple','banana']
const [frOne,frTwo] = fruits

//__тернарный оператор
let value = 11
console.log(value >= 0 ? value : - value);//11

//__классы
class Comments {
  constructor(text){
    this.text = text
    this.votes = 0
  }

  upvote(){
    this.votes += 1
  }
}

//расширяем класс
class Extends extends Comments {
  info(){
    console.log('any info');
  }
}
const newComments = new Comments('hello')
newComments.upvote()
newComments.info()

