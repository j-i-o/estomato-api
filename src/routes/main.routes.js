const router = require('express').Router()
const mainController = require('../controllers/main.controller.js')

router.get('/getInicio', mainController.getHome)

router.post('/createPaciente', mainController.createPacienteFull)
router.post('/createLesion', mainController.createLesionFull)

module.exports = router