const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../config/auth')

router.get('/', (req, res) => {
  res.render("welcome")
})

//Dashboard
router.get('/dashboard',ensureAuth, (req, res) => {
  console.log(req.user)
  res.render('dashboard')
})



module.exports = router




















 