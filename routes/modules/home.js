const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// show first page
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurant: restaurants }))
    .catch(error => console.log(error))
})


module.exports = router