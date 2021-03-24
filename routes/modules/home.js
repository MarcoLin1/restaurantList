const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// show first page
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurant: restaurants }))
    .catch(error => res.render('error', { error: error }))
})

// show first page (list mode)
router.get('/list', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('list', { restaurant: restaurant }))
    .catch(error => res.render('error', { error: error }))
})

module.exports = router