'use strict';
module.exports = (sequelize, DataTypes) => {
  const test = sequelize.define('test', {
    att1: DataTypes.STRING,
    att2: DataTypes.STRING
  }, {});
  test.associate = function(models) {
    // associations can be defined here
  };
  return test;
};