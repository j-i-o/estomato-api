const router = require('express').Router()
const nombLesionController = require('../controllers/nombLesion.controller.js')

router.get('/', nombLesionController.getNombLesiones)
router.get('/:id', nombLesionController.getNombLesionById)

router.post('/', nombLesionController.addNombLesion)

module.exports = router