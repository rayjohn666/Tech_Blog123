const { Model, DataTypes} = require('sequelize');

const sequelize = require('../config/connections.js');

class Comment extends Model {}

Comment.init({
    body: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{
    sequelize
}
);

module.exports = Comment;