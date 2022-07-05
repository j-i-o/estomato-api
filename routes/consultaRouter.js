const consultaController = require('../controllers/ConsultaController.js')

const router = require('express').Router()

router.post('/addConsulta', consultaController.addConsulta)
router.get('/getConsultas', consultaController.getConsultas)
router.put('/:id', consultaController.updateConsulta)

router.get('/getConsultas/:id', consultaController.getConsultasByLesionId)

router.get('/:id', consultaController.getConsultaById)

router.delete('/:id', consultaController.deleteConsulta)

module.exports = router