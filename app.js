const express = require('express')
const app = express()
const port = 3000
const exhbs = require('express-handlebars')
const mongoose = require('mongoose')
const db = mongoose.connection
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')

// setting mongodb
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// setting handlebars
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// browse app will first load the files and setting 
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// show first page
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurant: restaurants }))
    .catch(error => console.log(error))
})

// show new restaurant form page
app.get('/restaurant/new', (req, res) => {
  return res.render('new')
})

// complete add form, data will write to mongodb and redirect to first page 
app.post('/restaurant', (req, res) => {
  let { name, name_en, category, image, location, phone, googleMap, rating, description } = req.body
  return Restaurant.create({
    name: name,
    name_en: name_en,
    category: category,
    image: image,
    location: location,
    phone: phone,
    googleMap: googleMap,
    rating: rating,
    description: description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// show detail page
app.get('/restaurant/:id', (req, res) => {
  return Restaurant.findById(req.params.id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

// show edit page if you enter through the detail page
app.get('/restaurant/:id/edit', (req, res) => {
  return Restaurant.findById(req.params.id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

// complete edit page, data will write to mongodb and redirect to detail page
app.post('/restaurant/:id/edit', (req, res) => {
  let restautants = req.body
  return Restaurant.findById(req.params.id)
    .then(restaurant => {
      restaurant.name = restautants.name
      restaurant.name_en = restautants.name_en
      restaurant.category = restautants.category
      restaurant.image = restautants.image
      restaurant.location = restautants.location
      restaurant.phone = restautants.phone
      restaurant.googleMap = restaurant.googleMap
      restaurant.google_map = restautants.googleMap
      restaurant.rating = restautants.rating
      restaurant.description = restautants.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurant/${req.params.id}`))
    .catch(error => console.log(error))
})

// click delete icon that will remove data from mongodb and redirect to first page
app.post('/restaurant/:id/delete', (req, res) => {
  return Restaurant.findById(req.params.id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// setting search condition and show the result  
app.get('/search', (req, res) => {
  let keyword = req.query.keyword
  Restaurant.find({
    '$or': [
      { name: { $regex: keyword, $options: 'si' } },
      { category: { $regex: keyword, $options: 'si' } }
    ]
  })
    .lean()
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

// listening the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})