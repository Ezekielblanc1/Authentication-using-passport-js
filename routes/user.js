const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')

//Login Page
router.get('/login', (req, res) => {
  res.render("login")
})


//Register Page
router.get('/register', (req, res) => {
  res.render("register")
})

//Creating a user
router.post('/register', (req, res) => {
 const { name, email, password, password2} = req.body
 let errors = [];


 if(!name || !email || !password || !password2){
   errors.push({ msg : 'Please fill in all fields'})
 }
 if(password != password2){
   errors.push({ msg: 'Passwords do not match'})
 }

 if(password.length < 6){
   errors.push({ msg: 'Password should be at least 6 characters'})
 }

 if(errors.length > 0){
   res.render("register", {errors,name, email, password, password2})
 } else {
  //Successful validation
  User.findOne({ email: email})
    .then(user => {
      if(user){
        errors.push({ msg: 'User already exists'})
        res.render("register", {errors,name, email, password, password2})
      } else{
        const newUser = new User({
          name,
          email,
          password
        });
        bcrypt.genSalt(10,(err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err){
            throw err;
          }
          newUser.password = hash

          //Save the user
          newUser.save()
            .then((user) => {
              req.flash('success_msg', 'Registration successful')
              res.redirect('/user/login')
            })
            .catch(err => console.log(err))
        }))
      }
    })
 }
})
module.exports = router