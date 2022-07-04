const mainController = require('../controllers/MainController.js')

const router = require('express').Router()

router.get('/getInicio', mainController.getHome)
router.post('/createPaciente', mainController.createPacienteCompleto)


module.exports = router