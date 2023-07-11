"use strict"; //para que no se puedan usar variables no definidas

module.exports = (sequelize, DataTypes) => {
  let Lesion = sequelize.define(
    "lesion",
    {
      ultima_consulta: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true
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

  Lesion.associate = models => {
    Lesion.belongsTo(models.nombLesion, {
      foreignKey: "nombLesionId",
      as: "nombLesion",
    });
    Lesion.belongsTo(models.paciente, {
      foreignKey: "pacienteId",
      as: "paciente",
    });
    Lesion.belongsTo(models.estado, {
      foreignKey: "estadoId",
      as: "estado",
    });
    Lesion.hasMany(models.consulta, { as: "consulta" });
    Lesion.belongsToMany(models.ubicacion, { through: "lesionUbicacion" });
  };

  return Lesion;
};
