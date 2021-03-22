const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// show new restaurant form page
router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/restaurant/new', (req, res) => {
  return res.render('new')
})

// complete add form, data will write to mongodb and redirect to first page 
router.post('/', (req, res) => {
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
router.get('/:id', (req, res) => {
  return Restaurant.findById(req.params.id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

// show edit page if you enter through the detail page
router.get('/:id/edit', (req, res) => {
  return Restaurant.findById(req.params.id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

// complete edit page, data will write to mongodb and redirect to detail page
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  return Restaurant.findById(req.params.id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router