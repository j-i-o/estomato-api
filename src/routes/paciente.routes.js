const router = require('express').Router()
const pacienteController = require('../controllers/paciente.controller')

router.post('/', pacienteController.addPaciente)

router.get('/', pacienteController.getPacientes)
router.get('/:id', pacienteController.getPacienteById)

router.put('/:id', pacienteController.updatePaciente)

router.delete('/:id', pacienteController.deletePaciente)

module.exports = router