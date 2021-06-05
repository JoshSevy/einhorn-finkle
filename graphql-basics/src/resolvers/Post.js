const Post = {
  author(parent, args, { db }, info) {
    return db.users.find(user => user.id === parent.author);
  },
  comments(parent, args, { db }, info) {
    return comments.filter(comment => comment.post === parent.id)
  }
};

export { Post as default };