// легко перейти с front на back
//возможность балансировать нагрузку
//единые интерфейсы для front и back
//множество пакетов для работы с чем угодно

//Подходит: 
//backend for frontend
//Rest API
//graphQL API
//Microservices
//Web-scraping
//document generators
//test automation

//Не подходит:
//низкоуровневое програмирование
//сложные многопоточные приложения
//програмирование микроконтролеров

//проблема:
//нет типов (использовать ts)
//нет стандартов архитектуры (уже есть nestjs)
//один поток (нет)

//используем homebrew - пакетный менеджер
//используем nvm - можно устанавливать конкретные версии node по выбору

//---------------------------------
//Nodejs
//cерверное приложения
//Node API (файловая система)
//Единая версия на сервере
//CommonJs + es modules

//----------------------------
//REPL режим 
//для отладки
//работа в консоли

//------------------------
//events
//вместо events target использовать events emmiter
const EventEmmiter = require('events')

const myEmitter = new EventEmmiter()

//создали событие
const logConnect = () => {
  console.log('db connect');
}

myEmitter.addListener('connect',logConnect)

myEmitter.emit('connect') //db connect

//удалить определенный обработчик
myEmitter.removeListener('connect', logConnect)

//подписка c данными
myEmitter.on('msg', (data) => {
  console.log(data);
})
myEmitter.emit('msg','привет') //db connect

//вызовиться один раз
myEmitter.once('off', () => {
  console.log('вызовиться один раз');
})
myEmitter.emit('off')//вызовиться один раз
myEmitter.emit('off')

//устанвоить макс число слушателей
myEmitter.setMaxListeners(2)

//получить максимальное число слушателей
myEmitter.getMaxListeners()//2

//посчитать сколько слушателей на одном обработчике
myEmitter.listenerCount('msg')//1
myEmitter.listeners('msg')//получить массив слушателей

//добавить в начало списка обработчиков
myEmitter.prependListener('prepend', (data) => {
  console.log('prepend');
})

//получить все обработчики 
myEmitter.eventNames() //msg / prepend

//обработка ошибок
myEmitter.on('error',(err) => {
  console.log('error',err);
})
myEmitter.emit('error', new Error('boom!'))//error ..boom!

//target
const eventTarget = new EventTarget()
const logTarget = () => {
  console.log('connection');
}
eventTarget.addEventListener('connect',logTarget)
eventTarget.dispatchEvent(new Event('connect'))//connection

//--------------------------
//Устройство NodeJS
//Есть основной поток, если что то сложное то подключаеться дополнительный поток worker threads

//состовляющие компоненты node js
//v8
//libuv - асинхронные процессы
//стандартные библиотеки
//библиотеки c++

//сначало обрабатываеться движком v8 / node binding -> events queue (очередь событий) -> events loop -> callstack (heap /stack) ->(если что то тяжелое ) -> worker threads (отдельные потоки которые выполняют тяжелые операции) -> events queue (как только worker threads звершит работу то возвращаеться очередь) -> //....

//-------------------------
//event-loop.js

//фазы :
//инициализация

//таймеры - callback от заплонированных таймеров
//pending callback - callback от ситсемных операции
//idle,prepare - внутрение использование
//poll - расчет времени и обработки событий ввода вывода
//check - обработка setimmediate
//close callback - вызов событий close например сокеты

//также есть дополнительные фазы которые встраиваються между основными фазами
//nextTick, otherMicrotask (promise...)

//exit

//-----------------------
//__timers__//
// ------ 1
const start = performance.now();
setTimeout(() => {
  console.log('прошла секунда?');
  console.log(performance.now() - start);
}, 1000);

// ------ 2
function myFunc(arg) {
  console.log(`Аргумент => ${arg}`);
}

setTimeout(myFunc, 1500, 'Хороший');

// ------ 3
const timerId = setTimeout(() => {
  console.log('BOOM!');
}, 6000);

setTimeout(() => {
  clearTimeout(timerId);
  console.log('Очищено!');
}, 1000);

// ------ 4
const intervalId = setInterval(() => {
  console.log(performance.now());
}, 1000);

setTimeout(() => {
  clearInterval(intervalId);
}, 3000);

// ------ 5
console.log('Перед');

setImmediate(() => {
  console.log('После всего');
});

console.log('После');

// ------ 6

//взять или убрать ссылку на таймер
const timerObj = setTimeout(() => {
  console.log('Я запущусь?');
}, 2000);
timerObj.unref();

setImmediate(() => {
  timerObj.ref();
});

//-----------------------
//__call-stack__//

const a = 5;

function b() {
  return c();
}

function c() {
  return d();
}

function d() {
  console.log(a);
}

setTimeout(() => {
  console.log('Timeout');
}, 1000)

b();
//5
//Timeout

//------------------------------
//___Workers thread_____//

//js -> c++ -> Workers thread

//2 способа обработки не все Workers thread 
//Workers thread 4 до 1024 операции
//все файловые операции
//шифрование
//pipes

//системные асинхронные вызовы на уровне ядра (запросы)
//dns 
//tcp

const crypto = require('crypto');
const https = require('https');
const start = performance.now();

process.env.UV_THREADPOOL_SIZE = 24;

//запрос
for (let i = 0; i < 50; i++) {
  https.get('https://yandex.ru', (res) => {
    res.on('data', () => { });
    res.on('end', () => {
      console.log(performance.now() - start);
    });
  });
}

//шифрование
for (let i = 0; i < 50; i++) {
  crypto.pbkdf2('test', 'salt', 100000, 64,
    'sha512', (err, key) => {
      console.log(performance.now() - start);
    })
}

//-------------------------
//__performance__//
//измерения производительности

function slow() {
  //отметка по времени
  performance.mark('start');
  const arr = [];
  for (let i = 0; i < 100000000; i++) {
    arr.push(i * i);
  }
  performance.mark('end');

  //измерения между отметками
  performance.measure('slow', 'start', 'end');
}

slow();

//hook оbserver
const perf_hooks = require('perf_hooks');

test = perf_hooks.performance.timerify(test);

const performanceObserver = new perf_hooks.PerformanceObserver((items, observer) => {
  console.log(items.getEntries());
  const entry = items.getEntriesByName('slow').pop();
  console.log(`${entry.name}: ${entry.duration}`);
  observer.disconnect();
});

//подключаемся к...
performanceObserver.observe({ entryTypes: ['measure', 'function'] });

function test() {
  const arr = [];
  for (let i = 0; i < 100000000; i++) {
    arr.push(i * i);
  }
}

test()

//-----------------------------
//___гuse worker_threads__//

function factorial(n) {
  if (n === 1 || n === 0) {
    return 1;
  }
  return factorial(n - 1) * n;
}

//обычное взаимодействие
//worker-sync
const compute = (array) => {
  const arr = [];
  for (let i = 0; i < 100000000; i++) {
    arr.push(i * i);
  }
  return array.map(el => factorial(el));
};

const run = async () => {
  performance.mark('start');

  const result = [
    compute([25, 12, 20, 48, 30, 50]),
    compute([25, 12, 20, 48, 30, 50]),
    compute([25, 12, 20, 48, 30, 50]),
    compute([25, 12, 20, 48, 30, 50]),
  ];
  console.log(result);
  performance.mark('end');
  performance.measure('slow', 'start', 'end');
  console.log(performance.getEntriesByName('slow').pop())
}

run();//8883.78...

//worker (async)
const { Worker } = require('worker_threads');

const compute = (array) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker-client.js', {
      workerData: {
        array,
      }
    });

    worker.on('message', (msg) => {
      console.log(worker.threadId);
      resolve(msg)
    });

    worker.on('error', (err) => {
      reject(err)
    });

    worker.on('exit', () => {
      console.log(`Завершил работу`);
    });
  })
};

const run = async () => {
  performance.mark('start');

  const result = await Promise.all([
    compute([25, 12, 20, 48, 30, 50]),
    compute([25, 12, 20, 48, 30, 50]),
    compute([25, 12, 20, 48, 30, 50]),
    compute([25, 12, 20, 48, 30, 50]),
  ]);
  console.log(result);
  performance.mark('end');
  performance.measure('slow', 'start', 'end');
  console.log(performance.getEntriesByName('slow').pop())
}

run();

//worker-client.js

//parentPort - родительский порт / workerData - data
const { parentPort, workerData } = require('worker_threads'); 

const compute = ({ array }) => {
  const arr = [];
  for (let i = 0; i < 100000000; i++) {
    arr.push(i * i);
  }
  return array.map(el => factorial(el));
};

compute(workerData);

parentPort.postMessage(
  compute(workerData)
);
//3475.51.... быстрее 

//--------------------------
//__exec / spawn__//
//выполнить любой процесс
//выполнить в шеле определенный скрипт

//exec
const { exec } = require('child_process');

//создать процесс / что выполняли в консоли 
var workerProcess = exec('ls', function (error, stdout, stderr) {
  if (error) {
    console.log(error);
  }
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
});

//подписка при...
workerProcess.on('exit', function (code) {
  console.log('Child process exited with exit code ' + code);
});

//то же самое только другой синтаксис
//spawn
const { spawn } = require('child_process');

var workerProcess = spawn('ls');

workerProcess.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

workerProcess.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

workerProcess.on('close', function (code) {
  console.log('child process exited with code ' + code);
});

//-----------------------------
//____fork___//
//запускает процесс с указанным файлом

const { fork } = require('child_process');

const forkProcess = fork('./fork-client.js');

forkProcess.on('message', (msg) => {
  console.log(`Получено соообщение: ${msg}`);
});

forkProcess.on('close', (code) => {
  console.log(`Exited: ${code}`);
});

forkProcess.send('Ping');
forkProcess.send('disconnect');

//fork-client
process.on('message', (msg) => {
  if (msg == 'disconnect') {
    process.disconnect();
    return;
  }
  console.log(`Клиент получил: ${msg}`);
  process.send('Pong!');
})

//-------------------------------------
//______Производительность потоков___//

//factorial.js
function factorial(n) {
  if (n == 1 || n == 0) {
    return 1;
  }
  return factorial(n - 1) * n;
}

function compute({ array }) {
  const arr = [];
  for (let i = 0; i < 100000000; i++) {
    arr.push(i * i);
  }
  return array.map(el => factorial(el));
};

module.exports = { compute }

//fork.js
//использует ipc канал комуникации
//отжельный instance NodeJS
//child процессы не могут комунитировать
const { compute } = require('./factorial');

process.on('message', (msg) => {
  process.send(compute(msg));
  process.disconnect();
});

//worker.js
//имеет общую память с исходным кодом
//отдельный поток
//могут общаться между child
const { parentPort, workerData } = require('worker_threads');
const { compute } = require('./factorial');

parentPort.postMessage(compute(workerData))

//app.js
const { Worker } = require('worker_threads');
const { fork } = require('child_process');
const { performance, PerformanceObserver } = require('perf_hooks');
const { readFileSync } = require('fs');

const file = readFileSync('./file.mp4');

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}`);
  });
});
performanceObserver.observe({ entryTypes: ['measure'] });

const workerFunction = (array) => {
  return new Promise((resolve, reject) => {
    performance.mark('worker start');
    const worker = new Worker('./worker.js', {
      workerData: {
        array,
        file
      }
    });
    worker.on('message', (msg) => {
      performance.mark('worker end');
      performance.measure('worker', 'worker start', 'worker end');

      resolve(msg);
    });
  });
};

const forkFunction = (array) => {
  return new Promise((resolve, reject) => {
    performance.mark('fork start');
    const forkProcess = fork('./fork.js');
    forkProcess.send({ array, file });
    forkProcess.on('message', (msg) => {
      performance.mark('fork end');
      performance.measure('fork', 'fork start', 'fork end');
      resolve(msg);
    });

  });
};

const main = async () => {
  try {
    await workerFunction([25, 20, 19, 48, 30, 50]);
    await forkFunction([25, 20, 19, 48, 30, 50]);
  } catch (e) {
    console.error(e.message);
  }
};

main();

//большие данные и чпстая комуникация - worker
//мало комуникации, малые данные - fork

//на практике использовать worker всегда

//------------------------------
//____Устройство v8____//
//js -> AST(синтаксическое дерево) -> byte code -> машинный код

//AST
//синтаксическое дерево движок понимает что мы написали

//byte code
//набор инстукции

//Компиляторы
//после байт кода в идет в разные компиляторы если можем оптимизировать то кидаем в turbofan если не можем то sparkplug

//--------------------------------
//____Работа с памятью V8_____//

//Garbage collection - автоматический чистит память

//разные алгоритмы работы чистки 

//----------------------------------
//----------------------------------
//________Приложени погода________//

//___Аргументы командной строки___//

//helpers/ args.js
const getArgs = (args) => {
  const res = {};
  const [executer, file, ...rest] = args;
  rest.forEach((value, index, array) => {
    if (value.charAt(0) == '-') {
      if (index == array.length - 1) {
        res[value.substring(1)] = true;
      } else if (array[index + 1].charAt(0) != '-') {
        res[value.substring(1)] = array[index + 1];
      } else {
        res[value.substring(1)] = true;
      }
    }
  });
  return res;
};

export { getArgs }
//node weather -s minsk -h -> {s:minsk,h:true }

//------------------------------
//____Вывод в консоль___//

//log.service.js

//chalk - различные стили в консоли
import chalk from 'chalk';
//убрать отступы
import dedent from 'dedent-js';

const printError = (error) => {
  console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`
  );
};

const printWeather = (res, icon) => {
  console.log(
    dedent`${chalk.bgYellow(' WEATHER ')} Погода в городе ${res.name}
		${icon}  ${res.weather[0].description}
		Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
		Влажность: ${res.main.humidity}%
		Скорость ветра: ${res.wind.speed}
		`
  );
};

export { printError, printSuccess, printHelp, printWeather };

//----------------------------
//_____OS и path____//

//storage.service.js

//работа с нашей дерикторией ос
import { homedir } from 'os';

//работа с путями
import { join, basename, dirname, extname, relative, isAbsolute,resolve,sep } from 'path';

const filePath = join(homedir(), 'weather-data.json');

const saveKeyvalue = (key, value) => {
  console.log(basename(filePath)); // Выведет: weather-data.json
  console.log(dirname(filePath)); // Выведет: /Users/username (путь зависит от текущего пользователя)
  console.log(extname(filePath)); // Выведет: .json
  console.log(relative(filePath, dirname(filePath))); // Выведет: .. (относительный путь от /Users/username)
  console.log(isAbsolute(filePath)); // Выведет: true (путь является абсолютным)
  //результат относительно где находимся
  console.log(resolve('..'));
  //разделитель
  console.log(sep);
}

saveKeyvalue();

//------------------------------------
//_____Работа с файловой системой__//
import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city'
}

const saveKeyValue = async (key, value) => {
  let data = {};
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }
  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
};

const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };

//--------------------------------
//___Взаимодействие с API___//
//используем API wether

//api.service.js
import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case '01':
      return '☀️';
    case '02':
      return '🌤️';
    case '03':
      return '☁️';
    case '04':
      return '☁️';
    case '09':
      return '🌧️';
    case '10':
      return '🌦️';
    case '11':
      return '🌩️';
    case '13':
      return '❄️';
    case '50':
      return '🌫️';
  }
};

const getWeather = async (city) => {
  const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
  if (!token) {
    throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
  }
  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      lang: 'ru',
      units: 'metric'
    }
  });
  return data;
};

export { getWeather, getIcon };

//---------------------------------
//____App___//

//package.json
/* 
{
	"name": "weather-cli-demo",
	"version": "1.0.0",
	"description": "CLI for getting weather",
	"main": "weather.js",
	"bin": {
		"weather": "weather.js" - какой файл публиковать под каким именем будет вызваться
	},
	"type": "module", - модульный тип
*/


//weather.js
//#!/usr/bin / env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан token');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Токен сохранён');
  } catch (e) {
    printError(e.message);
  }
}

const saveCity = async (city) => {
  if (!city.length) {
    printError('Не передан город');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('Город сохранён');
  } catch (e) {
    printError(e.message);
  }
}

const getForcast = async () => {
  try {
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
    const weather = await getWeather(city);
    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (e) {
    if (e?.response?.status == 404) {
      printError('Неверно указан город');
    } else if (e?.response?.status == 401) {
      printError('Неверно указан токен');
    } else {
      printError(e.message);
    }
  }
}

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  return getForcast();
};

initCLI();

//дальше npm public делаем нашу сборку
//дальше ставим его глобально на компьютер npm i -d weather-cli-demo
//далее пользуемся вызываем его npm weather

//когда хотим локально запустить проект передаем ему параметры npm start -- -s moscow
//с помощью npx можно запустить пакет не устанавливая его npx weather-cli-demo
//c параметрами npm exec weather-cli-demo -- ...

//-----------------------
//-----------------------
//___API с ExpressJS___//

//Простой http сервер
import http from 'http'

const port = 7000
const server = http.createServer((req,res) => {
  switch (req.method) {
    case "GET":
        switch (req.url) {
          case '/hello':
            res.statusCode = 200
            res.setHeader("Content-Type",'text/plane')
            res.end('привет')
            break;
        }
      break;
  }
})

server.listen(port,() => {
  console.log('server on port', + " ", port);
})

//Переходим на express
import express from 'express'

const port2 = 8000

const app = express()

app.get('/hello',(req,res) => {
  res.send('hello')
})

//можно передовать разны параметры в url hel?lo - > необязательный параметр можно helo / h(el)?lo -> можно hlo / hel+lo - можно helllllo / hell* -> любое после helllksd
app.get('/hello2',(req,res) => {
  res.send('post')
  res.download('txt.pdf')
  res.header('...')
})

const cb  = (req,res,next) => {
  console.log('cb');
}
//можно переловать множество обработчиков
app.get('/hello2', cb, (req,res) => {
  res.send('post')
})
//можно переловать множество обработчиков / также в массиве
app.get('/hello2', [cb,cb,cb, (req,res) => {
  res.send('post')
}])

//Маршрутизация
app.route('/user')
  .get('/hello', (req, res) => {
    res.send('Привет!');
  })
  .post('/hello', (req, res) => {
    res.send('Привет!');
  });

app.listen(port2, () => {
  console.log('server on port', + " ", port);
})

//___Router

//index.js
import express from 'express';
import { userRouter } from './users/users.js';

const port3 = 8000;
const app2 = express();

app2.get('/hello', (req, res) => {
  res.end();
});

app2.use('/users', userRouter);

app2.listen(port3, () => {
  console.log(`Сервер запущен на http://localhost:${port3}`);
});

//users.js 
import express from 'express';

const userRouter = express.Router();

userRouter.post('/login', (req, res) => {
  res.send('login');
});

userRouter.post('/register', (req, res) => {
  res.send('register');
});

export { userRouter };

//__Промежуточные обработчики
const port4 = 8000;
const app4 = express();

app4.use((req, res, next) => {
  console.log('Время ', Date.now());
  next();
});

app4.get('/hello', (req, res) => {
  // res.send('Привет!');
  res.end();
  throw new Error('Error!!!');
});

app4.use('/users', userRouter);

//обработчик глобальный на все приложения
//обязательно next
app4.use((err, req, res, next) => {
  console.log(err.message);
  res.status(401).send(err.message);
});

app4.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

//--------------------------
//--------------------------
//___Работа с TypeScript__//

//TypeScript - удобства разработки, дополнительные подсказки, интерфейсы,

//npm i -g typescript
//tsc (компилятор tsc)
//tsc -- init (конфиг)

/* 
tsconfig.json
  ...
  {
    "moduleResolution": "node"
    "outDir": "./dist",
    "strict": true,
    ...
  }
*/


