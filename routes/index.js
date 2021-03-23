// main router
const express = require('express')
const router = express.Router()

// import modules
const home = require('./modules/home')
router.use('/', home)

const restaurants = require('./modules/restaurants')
router.use('/restaurant', restaurants)

const search = require('./modules/search')
router.use('/search', search)

const sort = require('./modules/sort')
router.use('/sort', sort)

module.exports = router