const router = require('express').Router()
const sexoController = require('../controllers/sexo.controller.js')

router.post('/', sexoController.addSexo)
router.get('/', sexoController.getSexos)

module.exports = router