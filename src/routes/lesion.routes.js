const router = require('express').Router()
const lesionController = require('../controllers/lesion.controller.js')

router.post('/', lesionController.addLesion)

router.get('/', lesionController.getLesiones)
router.get('/:id', lesionController.getLesionById)
router.get('/paciente/:id', lesionController.getLesionByPacienteId)

router.put('/:id', lesionController.updateLesion)

router.delete('/:id', lesionController.deleteLesion)

module.exports = router