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
  const userId = req.user._id
  let { name, name_en, category, image, location, phone, google_map, google_iframe, rating, description } = req.body
  return Restaurant.create({
    name: name,
    name_en: name_en,
    category: category,
    image: image,
    location: location,
    phone: phone,
    google_map: google_map,
    google_iframe: google_iframe,
    rating: rating,
    description: description,
    userId: userId
  })
    .then(() => res.redirect('/'))
    .catch(error => res.render('error', { error: error }))
})

// show detail page
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('detail', { restaurant: restaurant }))
    .catch(error => res.render('error', { error: error }))
})

// show edit page if you enter through the detail page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch(error => res.render('error', { error: error }))
})

// complete edit page, data will write to mongodb and redirect to detail page
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  let restaurants = req.body
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = restaurants.name
      restaurant.name_en = restaurants.name_en
      restaurant.category = restaurants.category
      restaurant.image = restaurants.image
      restaurant.location = restaurants.location
      restaurant.phone = restaurants.phone
      restaurant.google_iframe = restaurants.google_iframe
      restaurant.google_map = restaurants.google_map
      restaurant.rating = restaurants.rating
      restaurant.description = restaurants.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurant/${req.params.id}`))
    .catch(error => res.render('error', { error: error }))
})

// click delete icon that will remove data from mongodb and redirect to first page
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => res.render('error', { error: error }))
})

module.exports = router
