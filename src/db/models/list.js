'use strict';
module.exports = (sequelize, DataTypes) => {
  const list = sequelize.define('list', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    store: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  list.associate = function(models) {
    // associations can be defined here
    list.hasMany(models.item, {
      foreignKey: "listId",
      as: "items"
    })
  };
  return list;
};