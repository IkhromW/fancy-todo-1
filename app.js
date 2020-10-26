require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const router = require('./routers')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)

app.listen(PORT, () => {
  console.log('App Running on PORT: ' + PORT)
})
