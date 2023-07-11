const models = require("../database/models/index");

const Lesion = models.lesion;

/* 
  paciente = int
  estado = int
  nombLesion = int
  ubicacion = [int]
*/
const addLesion = async (req, res) => {
  try {
    const lesion = await Lesion.create({
      pacienteId: req.body.lesion.pacienteId,
      estadoId: req.body.lesion.estadoId,
      nombLesionId: req.body.lesion.nombLesionId,
    });
    let ubicaciones = req.body.lesion.lesionUbicacion;
    ubicaciones.forEach(async (id) => {
      const ubicacion = await models.ubicacion.findByPk(id);
      await lesion.addUbicacion(ubicacion);
    });

    if (req.body.full) {
      return lesion;
    } else {
      res.status(200).send(lesion);
    }
  } catch (error) {
    console.log("ERROR: ", error.message);
  }
};

const getLesiones = async (req, res) => {
  let lesiones = await Lesion.findAll({
    include: [
      "nombLesion",
      "paciente",
      "estado",
      { model: models.ubicacion, through: { attributes: [] } },
    ],
    order: [["ultima_consulta", "DESC"]],
  });
  res.status(200).send(lesiones);
};

const getLesionById = async (req, res) => {
  let lesion = await Lesion.findOne({
    where: { id: req.params.id },
    include: models.ubicacion,
  });
  if (lesion) {
    res.status(200).send(lesion);
  } else {
    res.status(404).send("No existe ningúna lesión con id = " + req.params.id);
  }
};

const getLesionByPacienteId = async (req, res) => {
  let paciente = await models.paciente.findByPk(req.params.id);
  if (paciente) {
    const lesion = await Lesion.findAll({
      include: [
        "nombLesion",
        "paciente",
        "estado",
        { model: models.ubicacion, through: { attributes: [] } },
      ],
      where: { pacienteId: paciente.id },
      order: [["ultima_consulta", "DESC"]],
    });

    res.status(200).send(lesion);
  } else {
    res.status(404).send("No existe ningún paciente con id = " + req.params.id);
  }
};

const deleteLesion = async (req, res) => {
  const lesion = await Lesion.findByPk(req.params.id);
  if (lesion) {
    try {
      // console.log(models);
      const cons = await models.lesionUbicacion.destroy({
        where: { lesionId: lesion.id },
      });
      console.log("CONSULTAS BORRADAS: " + cons);
      const les = await Lesion.destroy({
        where: { id: lesion.id },
      });
      console.log("LESIONES BORRADAS: " + les);
      res
        .status(200)
        .send("Lesión id Nº " + lesion.id + " borrada y todas sus consultas");
    } catch (error) {
      console.log("Error: " + error.message);
    }
  } else {
    res.status(404).send("No existe ningúna lesión con id = " + req.params.id);
  }
};

const updateLesion = async (req, res) => {
  const lesion = await Lesion.findByPk(req.params.id);
  if (lesion) {
    try {
      console.log(models);
      await Lesion.update(req.body.lesion, { where: { id: lesion.id } });
      const ubics = await models.lesionUbicacion.findAll({
        where: { lesionId: lesion.id },
      });
      console.log(ubics);
      if ((ubicacion = req.body.lesion.lesionUbicacion)) {
        await models.consulta.destroy({
          where: { lesionId: lesion.id },
        });
        ubicacion.forEach(async (id) => {
          const ubicacion = await models.ubicacion.findByPk(id);
          await lesion.addUbicacion(ubicacion);
        });
      }
      const response = await Lesion.findByPk(req.params.id);
      res.status(200).send(response);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  } else {
    res.status(404).send("No existe ninguna lesión con id = " + req.params.id);
  }
};

module.exports = {
  addLesion,
  getLesiones,
  getLesionById,
  getLesionByPacienteId,
  deleteLesion,
  updateLesion,
};
