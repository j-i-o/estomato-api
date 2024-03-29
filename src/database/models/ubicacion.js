"use strict"; //para que no se puedan usar variables no definidas

module.exports = (sequelize, DataTypes) => {
  let Ubicacion = sequelize.define(
    "ubicacion",
    {
      valor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    },
    {
      paranoid: true,
      freezeTableName: true,
    }
  );

  Ubicacion.associate = models => {
    Ubicacion.belongsToMany(models.lesion, { through: "LesionUbicacion" });
  };

  return Ubicacion;
};
