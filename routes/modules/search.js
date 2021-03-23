const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// setting search condition and show the result  
router.get('/', (req, res) => {
  let keyword = req.query.keyword
  Restaurant.find({
    '$or': [
      { name: { $regex: keyword, $options: 'si' } },
      { category: { $regex: keyword, $options: 'si' } }
    ]
  })
    .lean()
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => res.render('error', { error: error }))
})

module.exports = router