module.exports = (sequelize, DataTypes) => {

  const Sexo = sequelize.define("sexo", {
    valor: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      timestamps: false,
      freezeTableName: true
    }
  )

  Sexo.associate = function (db) {
    db.sexo.hasMany(db.paciente, { as: "paciente" })
  };

  return Sexo
}