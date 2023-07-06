const models = require("../database/models/index");

const Consulta = models.consulta;

const addConsulta = async (req, res) => {
  try {
    const lesion = await models.lesion.findByPk(req.body.consulta.lesionId);
    const date = new Date(req.body.consulta.fecha);
    const body = { ...req.body.consulta, lesionId: lesion.id, fecha: date };

    const consulta = await Consulta.create(body);

    lesion.update({ ultima_consulta: date });
    if (req.body.full) {
      return consulta;
    } else {
      res.status(200).send(consulta);
    }
  } catch (error) {
    console.log("Error: " + error.message);
  }
};

const getConsultas = async (req, res) => {
  let consultas = await Consulta.findAll({
    include: ["lesion"],
    order: [["createdAt", "DESC"]],
  });
  res.status(200).send(consultas);
};

const getConsultasByLesionId = async (req, res) => {
  const lesion = await models.lesion.findByPk(req.params.id);
  if (lesion) {
    let consultas = await Consulta.findAll({
      where: { lesionId: lesion.id },
      include: ["lesion"],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send(consultas);
  } else {
    res.status(404).send("No existe ninguna lesión con id = " + req.params.id);
  }
};

const getConsultaById = async (req, res) => {
  const consulta = await Consulta.findOne({
    where: { id: req.params.id },
    include: ["lesion"],
  });
  if (consulta) {
    res.status(200).send(consulta);
  } else {
    res
      .status(404)
      .send("No existe ninguna consulta con id = " + req.params.id);
  }
};

const deleteConsulta = async (req, res) => {
  const consulta = await Consulta.findByPk(req.params.id);
  if (consulta) {
    try {
      await Consulta.destroy({
        where: { id: id },
      });
      res.status(200).send("Consulta id Nº " + consulta.id + " borrada");
    } catch (error) {
      console.log("Error: " + error.message);
    }
  } else {
    res
      .status(404)
      .send("No existe ninguna consulta con id = " + req.params.id);
  }
};

const updateConsulta = async (req, res) => {
  const consulta = await Consulta.findByPk(req.params.id);
  if (consulta) {
    try {
      await Consulta.update(req.body.consulta, { where: { id: consulta.id } });
      const response = await Consulta.findByPk(req.params.id)
      res.status(200).send(response);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  } else {
    res
      .status(404)
      .send("No existe ninguna consulta con id = " + req.params.id);
  }
};

module.exports = {
  addConsulta,
  getConsultas,
  getConsultaById,
  getConsultasByLesionId,
  deleteConsulta,
  updateConsulta,
};
