const express = require('express')
const app = express()
const port = 3000
const exhbs = require('express-handlebars')

app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})