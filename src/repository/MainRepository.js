const db = require('../database/models')

const getUltimaConsulta = async lesionId => {
  ultConsulta = await db.consulta.findOne({
    where: { lesionId: lesionId },
    order: [['createdAt', 'DESC']],
  })

  return ultConsulta
}

module.exports = {
  getUltimaConsulta,
}