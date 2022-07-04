module.exports = (sequelize, DataTypes) => {

  const Ubicacion = sequelize.define("ubicacion", {
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

  Ubicacion.associate = function (db) {
    db.ubicacion.belongsToMany(db.lesion, { through: 'LesionUbicacion' })
  };

  return Ubicacion
}