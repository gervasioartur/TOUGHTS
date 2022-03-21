const express = require('express')
const router = express.Router()

//helpers
const checkAuth = require('../app/helpers/auth').checkAuth

//controlles
const ToutghtsController = require('../app/controllers/ToutghtController')

router.get('/dashboard', checkAuth, ToutghtsController.dashboard)
router.get('/add', checkAuth, ToutghtsController.creatTougth)
router.get('/edit/:id', checkAuth, ToutghtsController.updateTougth)
router.post('/edit', checkAuth, ToutghtsController.updateTougthPost)
router.post('/add', checkAuth, ToutghtsController.creatTougthPost)
router.post('/remove', checkAuth, ToutghtsController.removeTougth)
router.get('/', ToutghtsController.getAll)


module.exports = router