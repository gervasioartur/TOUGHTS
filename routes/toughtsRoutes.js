const express = require('express')
const router = express.Router()

//controlles
const ToutghtsController = require('../controllers/ToutghtController')

router.get('/', ToutghtsController.getAll)

module.exports = router