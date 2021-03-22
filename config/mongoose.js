const mongoose = require('mongoose')
const db = mongoose.connection
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })

// setting mongodb
db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db