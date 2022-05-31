const ubicacionController = require('../controllers/UbicacionController.js')

const router = require('express').Router()

router.post('/addUbicacion', ubicacionController.addUbicacion)
router.get('/getUbicaciones', ubicacionController.getUbicaciones)

router.get('/:id', ubicacionController.getUbicacionById)

module.exports = router