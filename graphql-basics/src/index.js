//THIRD PARTY IMPORTS
import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
//CUSTOM IMPORTS
import db from './db';

const resolvers = {
  Query: {
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
    },
  },
  Mutation: {
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
    createPost(parent, args, { db }, info) {
      const userExists = users.some(user => user.id === args.data.author);

      if (!userExists) {
        throw new Error('User not found!')
      }

      const post = {
        id: uuidv4(),
        ...args.data
      };

      posts.push(post);

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
    createComment(parent, args, { db }, info) {
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
      return comment;
    },
    deleteComment(parent, args, { db }, info) {
      const commentIndex = db.comments.indexOf(comment => comment.id === args.id);

      if (commentIndex === -1) {
        throw new Error('Comment not found');
      }

      const deletedComment = db.comments.splice(commentIndex, 1);

      return deletedComment[0];
    }
  },
  Post: {
    author(parent, args, { db }, info) {
      return db.users.find(user => user.id === parent.author);
    },
    comments(parent, args, { db }, info) {
      return comments.filter(comment => comment.post === parent.id)
    }
  },
  User: {
    posts(parent, args, { db }, info) {
      return db.posts.filter(post => post.author === parent.id);
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter(comment => comment.author === parent.id);

    }
  },
  Comment: {
    author(parent, args, { db }, info) {
      return db.users.find(user => user.id === parent.author);
    },
    post(parent, args, { db }, info) {
      return db.posts.find(post => post.id === parent.post);
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db
  }
});

server.start(() => {
  console.log('The server is up! Running on port 4000');
});