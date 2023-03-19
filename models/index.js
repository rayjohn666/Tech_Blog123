const User = require('./user');

const Comment = require('./comment')

User.hasMany(Comment, {
    foreignKey: 'commentId',
    onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });

module.exports = {
    User,
    Comment,
    
}