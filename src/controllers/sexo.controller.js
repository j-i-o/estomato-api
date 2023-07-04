const models = require('../database/models/index')

const Sexo = models.sexo

const addSexo = async (req, res) => {
  let info = {
    valor: req.body.valor,
  }

  const sexo = await Sexo.create(info)
  res.status(200).send(sexo)
}

const getSexos = async (req, res) => {

  let sexos = await Sexo.findAll({})
  res.status(200).send(sexos)
}

module.exports = {
  addSexo,
  getSexos,
}