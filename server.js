const express = require('express');

const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/about', (req, res) => {
  res.send('name: Duong Ngo Hung , age: 21, status: singer')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})