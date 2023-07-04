"use strict"; //para que no se puedan usar variables no definidas

module.exports = (sequelize, DataTypes) => {
  let Consulta = sequelize.define(
    "consulta",
    {
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      dx: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tto: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      observacion: {
        type: DataTypes.TEXT,
        allowNull: true,
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

  Consulta.associate = models => {
    Consulta.belongsTo(models.lesion, {
      foreignKey: "lesionId",
      as: "lesion",
    });
  };

  return Consulta;
};
