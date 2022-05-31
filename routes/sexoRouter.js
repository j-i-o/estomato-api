const sexoController = require('../controllers/SexoController.js')

const router = require('express').Router()

router.post('/addSexo', sexoController.addSexo)
router.get('/getSexos', sexoController.getSexos)

module.exports = router