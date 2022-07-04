module.exports = (sequelize, DataTypes) => {

  const Paciente = sequelize.define("paciente", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    observacion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  },
    {
      timestamps: false,
      freezeTableName: true
    }
  )

  Paciente.associate = function (db) {
    db.paciente.belongsTo(db.sexo, {
      foreignKey: "sexoId",
      as: "sexo"
    })
    db.paciente.hasMany(db.lesion, { as: "lesion" })
  };

  return Paciente
}