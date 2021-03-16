const express = require('express')
const app = express()
const port = 3000
const exhbs = require('express-handlebars')
const mongoose = require('mongoose')
const db = mongoose.connection
const Restaurant = require('./models/restaurant')

mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants: restaurants }))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})