const db = require('../models')

const Estado = db.estado

const addEstado = async (req, res) => {
  let info = {
    valor: req.body.valor,
  }

  const estado = await Estado.create(info)
  res.status(200).send(estado)
}

const getEstados = async (req, res) => {
  const estados = await Estado.findAll({})
  res.status(200).send(estados)
}

module.exports = {
  addEstado,
  getEstados
}