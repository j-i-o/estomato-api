const router = require('express').Router()
const estadoController = require('../controllers/estado.controller.js')

router.get('/', estadoController.getEstados)
router.post('/', estadoController.addEstado)


module.exports = router