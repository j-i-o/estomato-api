const db = require('../models')

module.exports = (sequelize, DataTypes) => {

  const Lesion = sequelize.define("lesion", {
    ultAct: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
    {
      freezeTableName: true
    }
  )

  Lesion.associate = function (db) {
    db.lesion.belongsTo(db.nombLesion, {
      foreignKey: "nombLesionId",
      as: "nombLesion"
    })
    db.lesion.belongsTo(db.paciente, {
      foreignKey: "pacienteId",
      as: "paciente"
    })
    db.lesion.belongsTo(db.estado, {
      foreignKey: "estadoId",
      as: "estado"
    })
    db.lesion.hasMany(db.consulta, { as: "consulta" })
    db.lesion.belongsToMany(db.ubicacion, { through: 'LesionUbicacion' })

  };

  return Lesion
}