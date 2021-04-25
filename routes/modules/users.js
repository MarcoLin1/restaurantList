const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const user = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})


router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'All fields are required.' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Password and conform password are different.' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: 'User exists' })
      res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    }
  })
})

router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('successMessage', 'Logout successfully')
  res.redirect('/users/login')
})

module.exports = router