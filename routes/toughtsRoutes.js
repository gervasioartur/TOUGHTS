const express = require('express')
const router = express.Router()

//helpers
const checkAuth = require('../helpers/auth').checkAuth

//controlles
const ToutghtsController = require('../controllers/ToutghtController')

router.get('/dashboard', checkAuth, ToutghtsController.dashboard)
router.get('/', ToutghtsController.getAll)


module.exports = router