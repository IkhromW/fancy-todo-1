const router = require('express').Router()
const todoRouter = require('./todoRouter')

router.get('/', (req, res) => {
  res.send('Hello World')
})

router.use('/todos',todoRouter)

module.exports = router