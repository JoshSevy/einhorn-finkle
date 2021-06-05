const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users
    }
    return db.users.filter((user) => {
      return db.user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts
    }
    return db.posts.filter(post => {
      const title = post.title.toLowerCase().includes(args.query.toLowerCase());
      const body = post.body.toLowerCase().includes(args.query.toLowerCase());
      if (title || body) {
        return post;
      }
      return 'No posts!'
    })
  },
  post() {
    return {
      id: 234,
      title: 'Challenge 4',
      body: 'Look at me completing challenge 4 easily',
      published: true
    }
  },
  me() {
    return {
      id: 123,
      name: 'Joshua Sevy',
      email: 'joshuasevy@outlook.com',
      age: 38
    }
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  }
};

export { Query as default };