const Restaurant = require('../restaurant')
const restaurantJson = require('./restaurant.json')
const db = require('../../config/mongoose')

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
      google_map: restaurantJson.results[i].google_map,
      googleMap: restaurantJson.results[i].googleMap,
      rating: restaurantJson.results[i].rating,
      description: restaurantJson.results[i].description
    })
  }
  console.log('completed')
})

