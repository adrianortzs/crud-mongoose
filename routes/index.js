const express = require('express')

const router = express.Router()
const usersRoutes = require('./tasks')

router.use('/', usersRoutes)

module.exports = router