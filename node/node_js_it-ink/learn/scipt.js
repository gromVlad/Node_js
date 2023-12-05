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
