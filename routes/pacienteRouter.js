const pacienteController = require('../controllers/PacienteController.js')

const router = require('express').Router()

router.post('/addPaciente', pacienteController.addPaciente)
router.get('/getPacientes', pacienteController.getPacientes)

router.put('/:id', pacienteController.updatePaciente)

router.get('/:id', pacienteController.getPacienteById)

router.delete('/:id', pacienteController.deletePaciente)


module.exports = router