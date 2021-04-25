const Restaurant = require('../restaurant')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const restaurantJson = require('./restaurant.json')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const User = require('../user')

const SEED_USER = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}, {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}]


db.once('open', () => {
  SEED_USER.forEach((user, index) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
      .then(seedUser => {
        const userId = seedUser._id
        const restaurantList = restaurantJson.results

        return Promise.all(Array.from(
          { length: 3 },
          (_, i) => Restaurant.create({
            name: restaurantList[i + (index * 3)].name,
            name_en: restaurantList[i + (index * 3)].name_en,
            category: restaurantList[i + (index * 3)].category,
            image: restaurantList[i + (index * 3)].image,
            phone: restaurantList[i + (index * 3)].phone,
            location: restaurantList[i + (index * 3)].location,
            google_map: restaurantList[i + (index * 3)].google_map,
            google_iframe: restaurantList[i + (index * 3)].google_iframe,
            rating: restaurantList[i + (index * 3)].rating,
            description: restaurantList[i + (index * 3)].description,
            userId: userId
          })
        ))
      })
      .then(() => {
        console.log('done')
        process.exit()
      })
      .catch(error => console.log(error))
  })
})

