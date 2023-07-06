const router = require('express').Router()
const consultaController = require('../controllers/consulta.controller.js')
const validate = require('../middlewares/validate')
const consultaScheme = require('../middlewares/schemes/consulta.scheme')


router.get('/', consultaController.getConsultas)
router.get('/:id', consultaController.getConsultaById)
router.get('/lesion/:id', consultaController.getConsultasByLesionId)

router.post('/', validate(consultaScheme.crearConsulta), consultaController.addConsulta)

router.put('/:id', validate(consultaScheme.updateConsulta), consultaController.updateConsulta)

router.delete('/:id', consultaController.deleteConsulta)

module.exports = router