const router = require('express').Router()
const pacienteController = require('../controllers/paciente.controller')
const validate = require('../middlewares/validate')
const pacienteScheme = require('../middlewares/schemes/paciente.scheme')

router.post('/', validate(pacienteScheme.crearPaciente), pacienteController.addPaciente)

router.get('/', pacienteController.getPacientes)
router.get('/:id', pacienteController.getPacienteById)

router.put('/:id', validate(pacienteScheme.updatePaciente), pacienteController.updatePaciente)

router.delete('/:id', pacienteController.deletePaciente)

module.exports = router