'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: 'title is required'
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "status is required"
        }
      }
    },
    due_date:{ 
      type : DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: {
          args:  new Date().toISOString().split('T')[0],
          msg : 'date is invalid, must input tommorrow date'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.status = 'unfinished'
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};