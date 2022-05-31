const mainController = require('../controllers/MainController.js')

const router = require('express').Router()

router.get('/getInicio', mainController.getHome)


module.exports = router