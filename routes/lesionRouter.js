const lesionController = require('../controllers/LesionController.js')

const router = require('express').Router()

router.post('/addLesion', lesionController.addLesion)
router.get('/getLesiones', lesionController.getLesiones)

router.put('/:id', lesionController.updateLesion)

router.get('/:id', lesionController.getLesionById)

router.delete('/:id', lesionController.deleteLesion)

module.exports = router