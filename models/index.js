const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Comment, {
    foreignKey: 'commentId',
    onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

User.hasMany(Post, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

Post.belongsTo (User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Comment.belongsTo (Post, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

Post.hasMany (Comment, {
    foreignKey: 'commentId',
    onDelete: 'CASCADE'
});

module.exports = {
    User,
    Comment,
    Post,
}