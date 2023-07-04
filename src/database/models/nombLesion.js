"use strict"; //para que no se puedan usar variables no definidas

module.exports = (sequelize, DataTypes) => {
  const NombLesion = sequelize.define(
    "nombLesion",
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

  NombLesion.associate = models => {
    NombLesion.hasMany(models.lesion, { as: "lesion" });
  };

  return NombLesion;
};
