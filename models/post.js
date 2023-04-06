const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connections.js');

class Post extends Model {}

Post.init(
{
    id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    },
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true,
    },
    },
    password: {
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
