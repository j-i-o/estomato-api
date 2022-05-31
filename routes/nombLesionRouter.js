const nombLesionController = require('../controllers/NombLesionController.js')

const router = require('express').Router()

router.post('/addNombLesion', nombLesionController.addNombLesion)
router.get('/getNombLesiones', nombLesionController.getNombLesiones)

router.get('/:id', nombLesionController.getNombLesionById)

module.exports = router