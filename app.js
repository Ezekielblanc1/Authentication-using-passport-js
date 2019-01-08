const express = require('express');
const app = express();
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts');

const indexRoute = require('./routes/index')
const userRoute = require('./routes/user')

//Setting up EJS
app.use(expressLayouts);
app.set("view engine", "ejs")



//Routes
app.use('/', indexRoute)
app.use('/user', userRoute)


mongoose.connect('mongodb://localhost:27017/Authentication', {useNewUrlParser: true})
  .then(() => console.log('Connected to database successfully'))
  .catch((err) => console.log(err))



const PORT = process.env.PORT ||4001
app.listen(PORT, () => console.log(`App running on port ${PORT}` ))