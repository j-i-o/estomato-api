const router = require('express').Router()
const consultaController = require('../controllers/consulta.controller.js')

router.get('/', consultaController.getConsultas)
router.get('/:id', consultaController.getConsultaById)
router.get('/lesion/:id', consultaController.getConsultasByLesionId)

router.post('/', consultaController.addConsulta)

router.put('/:id', consultaController.updateConsulta)

router.delete('/:id', consultaController.deleteConsulta)

module.exports = router