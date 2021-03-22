const express = require('express')
const app = express()
const port = 3000
const exhbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')
const routes = require('./routes')

// setting mongodb
const db = mongoose.connection
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// setting handlebars
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// browse app will first load the files and setting 
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// setting method-override
app.use(methodOverride('_method'))

// setting routes
app.use(routes)

// listening the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})