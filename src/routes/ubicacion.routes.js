const router = require('express').Router()
const ubicacionController = require('../controllers/ubicacion.controller.js')

router.get('/', ubicacionController.getUbicaciones)
router.get('/:id', ubicacionController.getUbicacionById)

router.post('/', ubicacionController.addUbicacion)

module.exports = router