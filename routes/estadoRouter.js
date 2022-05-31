const estadoController = require('../controllers/EstadoController.js')

const router = require('express').Router()

router.post('/addEstado', estadoController.addEstado)
router.get('/getEstados', estadoController.getEstados)


module.exports = router