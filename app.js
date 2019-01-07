const express = require('express');
const app = express()



const PORT = process.env.PORT ||4001
app.listen(PORT, () => console.log(`App running on port ${PORT}` ))