const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantJson = require('./restaurant.json')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < restaurantJson.results.length; i++) {
    Restaurant.create({
      name: restaurantJson.results[i].name,
      name_en: restaurantJson.results[i].name_en,
      category: restaurantJson.results[i].category,
      image: restaurantJson.results[i].image,
      location: restaurantJson.results[i].location,
      phone: restaurantJson.results[i].phone,
      googleMap: restaurantJson.results[i].google_map,
      rating: restaurantJson.results[i].rating,
      description: restaurantJson.results[i].description
    })
  }
  console.log('completed')
})
