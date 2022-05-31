const db = require('../models')

module.exports = (sequelize, DataTypes) => {

  const Consulta = sequelize.define("consulta", {
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dx: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    observacion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  },
    {
      freezeTableName: true
    }
  )

  return Consulta
}