import express from 'express'
const app = express()
const port = process.env.PORT || 5000;

app.get('/', (req:any, res:any) => {
  res.send('Hello!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})