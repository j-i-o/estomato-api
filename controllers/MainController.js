const db = require('../models')
const mainRepo = require('../repository/MainRepository')

const getHome = async (req, res) => {

  let datos = await db.paciente.findAll({ include: ["sexo"] })

  for (let paciente of datos) {
    try {
      lesion = await db.lesion.findOne({
        where: { pacienteId: paciente.id },
        order: [['ultAct', 'DESC']],
        include: [
          "nombLesion",
          "estado",
          { model: db.ubicacion, through: { attributes: [] } } //attributes: [] para no retornar la join table
        ]
      })
      const ultimaConsulta = await mainRepo.getUltimaConsulta(lesion.id) 
      lesion.setDataValue('consulta', ultimaConsulta)
      paciente.setDataValue('lesion', lesion);    //default toString() borra otras propiedades adicionales del modelo
    } catch (error) {
      console.log("Error: " + error.message)
    }
  }

  res.status(200).send(datos)
}

module.exports = {
  getHome,
}