const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

// setting handlebars
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting session 
app.use(session({
  secret: 'secretId',
  resave: false,
  saveUninitialized: true
}))

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