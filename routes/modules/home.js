const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// show first page
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurant: restaurants }))
    .catch(error => res.render('error', { error: error }))
})

// show first page (list mode)
router.get('/list', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurant => res.render('list', { restaurant: restaurant }))
    .catch(error => res.render('error', { error: error }))
})

module.exports = router