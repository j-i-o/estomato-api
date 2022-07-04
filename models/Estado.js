module.exports = (sequelize, DataTypes) => {

  const estado = sequelize.define("estado", {
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

  estado.associate = function (db) {
    db.estado.hasMany(db.lesion, { as: "lesion" })
  };
  return estado

}