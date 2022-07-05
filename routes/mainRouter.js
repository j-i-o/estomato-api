const mainController = require('../controllers/MainController.js')

const router = require('express').Router()

router.get('/getInicio', mainController.getHome)
router.post('/createPaciente', mainController.createPacienteFull)
router.post('/createLesion', mainController.createLesionFull)


module.exports = router