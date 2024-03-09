const router = require('express').Router()

const emailRoutes = require('./EmailRoutes/emailRoutes')

router.use('/contact', emailRoutes)

module.exports = router
