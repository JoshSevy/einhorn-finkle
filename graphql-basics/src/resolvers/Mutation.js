import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some(user => user.email === args.data.email);
    if (emailTaken) {
      throw new Error('Email already in use!');
    }

    const user = {
      id: uuidv4(),
      ...args.data
    }

    db.users.push(user);

    return user
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex(user => user.id === args.id);

    if (userIndex === -1) {
      throw new Error('User not found!');
    }

    const deletedUser = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter(post => {
      const match = post.author === args.id;

      if (match) {
        comments = db.comments.filter(comment => comment.post !== post.id);
      }

      return !match
    });
    db.comments = db.comments.filter(comment => comment.author !== args.id);

    return deletedUser[0];
  },
  updateUser(parent, args, { db }, info) {
    const user = db.users.find(user => user.id === args.id);

    if (!user) throw new Error('No user found');

    if (typeof args.data.email === 'string') {
      const emailTaken = db.users.some(user => user.email === args.data.email);

      if (emailTaken) throw new Error('Email already taken');

      user.email = args.data.email;
    };

    if (typeof args.data.name === 'string') {
      user.name = args.data.name;
    };

    if (typeof args.data.age !== 'undefined') {
      user.age = args.data.age;
    };

    return user;
  },
  createPost(parent, args, { db, pubSub }, info) {
    const userExists = users.some(user => user.id === args.data.author);

    if (!userExists) {
      throw new Error('User not found!')
    }

    const post = {
      id: uuidv4(),
      ...args.data
    };

    db.posts.push(post);
    pubSub.publish(`post ${post.id}`, { post });

    return post;
  },
  deletePost(parent, args, { db }, info) {
    const postIndex = posts.indexOf(post => post.id === args.id);

    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    const deletedPost = posts.splice(postIndex, 1);

    db.comments = db.comments.filter(comment => comment.post !== args.id);

    return deletedPost[0];
  },
  updatePost(parent, { id, data }, { db }, info) {
    const post = db.posts.find(post => post.id === id);

    if (!post) {
      throw new Error('No post found')
    }

    if (typeof data.title === 'string') {
      post.title = data.title;
    }

    if (typeof data.body === 'string') {
      post.body = data.body;
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published;
    }

    return post;
  },
  createComment(parent, args, { db, pubSub }, info) {
    const postPublished = db.posts.some(post => post.id === args.data.post && post.published);
    const userExists = db.users.some(user => user.id === args.data.author);

    if (!postPublished) {
      throw new Error('Post not found');
    }

    if (!userExists) {
      throw new Error('User not found');
    }

    const comment = {
      id: uuidv4(),
      ...args.data
    }

    db.comments.push(comment);
    pubSub.publish(`comment ${args.data.post}`, { comment })

    return comment;
  },
  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.indexOf(comment => comment.id === args.id);

    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }

    const deletedComment = db.comments.splice(commentIndex, 1);

    return deletedComment[0];
  },
  updateComment(parent, { id, data }, { db }, info) {
    const comment = db.comments.find(comment => comment.id === id);

    if (!comment) throw new Error('No comment found');

    if (typeof data.text === 'string') {
      comment.text = data.text;
    };

    return comment;
  }
};

export { Mutation as default };