const express = require('express')
const app = express()
const port = 3000
const exhbs = require('express-handlebars')
const mongoose = require('mongoose')
const db = mongoose.connection
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')

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
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants: restaurants }))
    .catch(error => console.log(error))
})

app.get('/restaurant/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurant', (req, res) => {
  let { name, name_en, category, image, location, phone, googleMap, rating, descriptions } = req.body
  return Restaurant.create({
    name: name,
    name_en: name_en,
    category: category,
    image: image,
    location: location,
    phone: phone,
    googleMap: googleMap,
    rating: rating,
    descriptions: descriptions
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurant/:id', (req, res) => {
  return Restaurant.findById(req.params.id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant: restaurant }))
    .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})