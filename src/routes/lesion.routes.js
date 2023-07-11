const router = require('express').Router()
const lesionController = require('../controllers/lesion.controller.js')
const validate = require('../middlewares/validate')
const lesionScheme = require('../middlewares/schemes/lesion.scheme')

router.post('/', validate(lesionScheme.crearLesion), lesionController.addLesion)

router.get('/', lesionController.getLesiones)
router.get('/:id', lesionController.getLesionById)
router.get('/paciente/:id', lesionController.getLesionByPacienteId)

router.put('/:id', validate(lesionScheme.updateLesion), lesionController.updateLesion)

router.delete('/:id', lesionController.deleteLesion)

module.exports = router