const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connections.js');

class Post extends Model {}

Post.init(
{
    Title: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    },
    content: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    author: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isAuthor: true,
    },
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW,
        validate: {
          isDate: true,
        },
      }
      
},

{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
}
);

module.exports = Post;
