//npm - менеджер пакетов
//npm init ...
//npm install ...
//npm uninstall ...
//dev depensiv - npm i --save-dev ...

//_Node_JS
//Програмная платформа
//Взаимодействия вводу выводу через api с++
//- простата
//- скорость
//- front и backend на 1 языке
//- богатый менеджер пакетов NPM

//_Концепции
//Преобразует исходный код в  машинный код
//v8(с++) -> Libuv (кросплатформенный ввод и вывод i/o и цикл событий)
//Сложные математичсекие операции будут сложны node/js

//_Блокирующий ввод / вывод
//пока команда не выполнилась код дальше не пойдет
//блокирует весь поток при выполнении
//есть разные потоки в зависемости от задач
//поток занимает много ресурсов

//_Неблокирующий веб-сервер
//главный поток (main thread) - системные вызовы недемленно возврощают управление не ожидая выполнения чтения или записи

//_Асинхроность
//вся асинхронсть достигаеться event Loop
//node js - однопоточный но libuv(с) может использовать потоками (минимум 4 потока) / тоесть некоторые библиотеки могут использовать потоки

const crypto = require("crypto"); // для криптографии (шифрование и т.д.)

const start = Date.now();

crypto.pbkdf2("123", "5", 10000, 64, "sha512", () => {
  console.log(Date.now() - start); //950 мл
});

crypto.pbkdf2("123", "5", 10000, 64, "sha512", () => {
  console.log(Date.now() - start); //987 мл
});

crypto.pbkdf2("123", "5", 10000, 64, "sha512", () => {
  console.log(Date.now() - start); //950 мл
});

crypto.pbkdf2("123", "5", 10000, 64, "sha512", () => {
  console.log(Date.now() - start); //969 мл
});

//5  поток выполниться в очереди когда освободиться все остальные т.к. по умолчанию может обработать 4 потока
crypto.pbkdf2("123", "5", 10000, 64, "sha512", () => {
  console.log(Date.now() - start); //1200 мл
});

//есть планировщик потоков который выделяет потокам определенное время и ресурсы и пулл потоков с ее потоками.

//Современные операционные ситсемы предостовляют механизм - демультиплексор событий именно он делает неблокирующие  input / output возможным

//демультиплексор событий
//Интрефейс уведомлений из события , сборка и постановка в очередь ввода и вывода / могут разные в зависемости от платформы (linux / windows ...)

//очередь событий событий с обработчиками

//и всем этим управляет event loop

//_работа
//_приложения создает операцию ввода и вывода -> демультиплексор событий (обработчик будет вызван когда будет завершена операция) -> очередь событий - event loop выполяент обход операций из очереди ->  после чего вызываеться соответвующий обработчик -> если требуеться дополнительня обработка событий то он опять возврощаеться в демультиплексор событий и все опять по новой ...

//--------------------------
//_ Event Loop

//порядок выполнения
// - таймеры
// - input / output коллбэки
// - ожидание подготовка
// - опрос
// - проверка
// - коллбэки 'close'

//----------------------------
//_Глобальный объект process
//переменные окружения

//устанавливать премемнные окружения в консоли node - cross-env установить
// cross-env  PORT=5000 node .les/one.js

//также используеи библиотеку dotenv чтобы при хранении в одном месте переменные окружения получать их везде в приложении

process.env.PORT; //создаем свои пременные окружения

process.argv; //пути переданные в командой строке при вызове

//process.exit(); //завершить процесс

//---------------------------
//__Модуль path (пути)
//используем этот модуль т.к н а разных ситсемах могут быть разные сепораторы путей(/)
const path = require("path");

path.join("first", "second"); //first/second

__dirname; // путь к текущей директории

path.join(__dirname, ".."); //вернуться назад на одну папку

path.resolve("first"); //вовзрощает абсолютный путь с ..

//парсинг пути в объект
path.parse(__dirname);

//полная информация о url
const url = "https://nnmclub.to/";
const urlWork = new URL(url);

//---------------------------
//_Работа с файловой системой
//есть обычный метод и его синхронный вариант
const fs = require("fs");
const { count } = require("console");

//создаем папку / recursive:true создавать много папок сразу
fs.mkdirSync(path.resolve(__dirname, "dir", "dir1", { recursive: true }));
//асинхронный вариант
fs.mkdir(path.resolve(__dirname, "dir", "dir1"), (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("create file");
});

//удалять папки
fs.rmdir(path.resolve(__dirname, "dir", "dir1"), () => {});

//создать файл с данными (перезатрет)
fs.writeFile(path.resolve(__dirname, "dir"), "hello!!!", () => {});

//дозаписать файл
fs.appendFile(path.resolve(__dirname, "dir"), "world!!!", () => {});

//чтобы не было ада колбэков напишем все на promise
const writeFile = async (path, text) => {
  return new Promise((res, rej) =>
    fs.writeFile(path, text, (err) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log("create file");
      res();
    })
  );
};

const appendFile = async (path, text) => {
  return new Promise((res, rej) =>
    fs.writeFile(path, text, (err) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log("create file");
      res();
    })
  );
};

//читать файл
const readFile = async (path) => {
  return new Promise((res, rej) =>
    fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log("create file");
      res(data);
    })
  );
};

//удалить модуль
const deleteFile = async (path) => {
  return new Promise((res, rej) =>
    fs.rm(path, (err) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log("create file");
      res();
    })
  );
};

writeFile(path.resolve(__dirname, "dir", "text.txt"), "create file")
  .then(() => appendFile(path.resolve(__dirname, "dir"), "text.txt", "123"))
  .then(() => appendFile(path.resolve(__dirname, "dir"), "text.txt", "123"))
  .then(() => readFile(path.resolve(__dirname, "dir")))
  .then((data) => console.log(data))
  .then(() => deleteFile(path.resolve(__dirname, "dir")))
  .catch((err) => console.log(err));

//ЗД
//через переменную окружения передать строку , записать ее в файл прочитать файл, посчитать кол-во слов в файле и записать их в новом файле затем удалить первый файл
const text = process.env.TEXT || "";
writeFile(path.resolve(__dirname, "text.txt"), text)
  .then(() => readFile(path.resolve(__dirname, "text.txt")))
  .then((data) => data.split(" ".length))
  .then((count) => writeFile(path.resolve(__dirname, "text.txt"), count))
  .then(() => deleteFile(path.resolve(__dirname, "text.txt")))
//сross-env TEXT = "1 2 3 4 5" node ./les/file-system.js -> 5

//-------------------------
//_Модуль cluster 
//взаимодействие с операционной системой
const os = require("os");
const cluster = require("cluster");//однопоточному приложению использовать все возможности многоядерных ситсем 

os.platform() // текущею операционную систему
os.arch() //архитектура процессора
os.cpus().length //описание ядра процессора / количество ядер

for (let index = 0; index < os.cpus().length - 2; index++) {
  os.cpus()[i]
}

const cpus = os.cpus()
//isMaster -являеться ли процесс главным
if (cluster.isMaster){
  //для каждого ядра будет запускать процесс
  for (let index = 0; index < cpus.length - 2; index++) {
    cluster.fork()
  } 
  //события
  cluster.on('exit',(w) => {
    console.log(w.process.pid, ' умер');
    //дальше запускаем еще процесс чтобы всегда работало максимально возможное число процессов
  })
} else {
  //process.pid - id процесса
  console.log(process.pid,'еще работает');
}

//------------------------
//__Модуль события events
const Emmiter = require("events");

const emitter = new Emmiter()

emitter.on('message', (data1, data2) => {
  console.log(data1, data2);
})
const callOne = emitter.on('message2',(data1,data2) => {
  console.log(data1,data2);
})

const MESSAGE = process.env.message || ""

if (MESSAGE){
  emitter.emit('message','hello ', 'world')
}

//когда использовать - http / websockets / long puling / clusters

//лишь единожды
emitter.once('message2', callOne)

//удалять обработчики
emitter.removeAllListeners()
emitter.removeListener('message2', callOne)

//---------------------------
//__Стримы (потоки)
//Разные типы
//Redable - чтение
//Writable - запись
//Duplex - для чтения и записи Readable + Writable
//tranform - токой же как Duplex, но может зменять данные по мере чтения


