const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connections.js');

class Post extends Model {}

Post.init(
{
    Title: {
    type: DataTypes.INTEGER,
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
        isEmail: true,
    },
    },
    created_at: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        len: [8],
    },
    },
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
