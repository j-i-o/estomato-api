"use strict"; //para que no se puedan usar variables no definidas

module.exports = (sequelize, DataTypes) => {
  let Estado = sequelize.define(
    "estado",
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

  Estado.associate = models => {
    Estado.hasMany(models.lesion, { as: "lesion" });
  };
  return Estado;
};
