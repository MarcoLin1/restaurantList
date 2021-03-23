const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/:type/:method', (req, res) => {
  const type = req.params.type
  const method = req.params.method
  Restaurant.find()
    .lean()
    .sort({ [type]: method })
    .then(restaurants => res.render('index', { restaurant: restaurants }))
    .catch(error => res.render('error', { error: error }))
})

module.exports = router
