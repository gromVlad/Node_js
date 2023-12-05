//____Simple express app with typescript and nodemon___//

// yarn init --yes
// yarn add express

//index.js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  debugger
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
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

//------------------------------------
//_________