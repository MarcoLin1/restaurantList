// main router
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const sort = require('./modules/sort')
const user = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')


router.use('/restaurant', authenticator, restaurants)
router.use('/users', user)
router.use('/auth', auth)
router.use('/search', authenticator, search)
router.use('/sort', authenticator, sort)
router.use('/', authenticator, home)


module.exports = router