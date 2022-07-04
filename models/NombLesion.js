module.exports = (sequelize, DataTypes) => {

  const NombLesion = sequelize.define("nombLesion", {
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

  NombLesion.associate = function (db) {
    db.nombLesion.hasMany(db.lesion, { as: "lesion" })
  };

  return NombLesion
}