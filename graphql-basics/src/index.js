import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

//! 5 Scalar GraphQL Types: String, Boolean, Int, Float, ID
//! Add Comment Type and resolvers
//!1. Set up a "Comment" type with id and text fields. Non-nullable
//!2. Set up a "comments" array with a comments
//!3. Set up a "comments" query with a resolver that returns all the comments
//!4. Run a query to get all a comments with both id and text fields.

//! Connect Comment and User
//! GOALS: Set up a relationship between Comment and User
//!1. Set up an author field on Comment
//!2. Update all comments in the array to have a new author field that returns the user who wrote the comment
//!3. Create a resolver for the Comments author field that returns the user who wrote the comment
//!4. Run a sample query that gets all comments and gets the authors name
//!5. Set up a comment field on User
//!6. Set up a resolver for the User comments field that returns all comments belonging to that user
//!7. Run a sample query that gets all users and all those comments

//! Connect Post and Comment
//! GOALS: Set up relationship between Post and Comment

//!1. Set up a post field on Comment
//!2. Update all the comments in the array to have a new post field *use one of the post ids as value
//!3. Create a resolver for the Comments post field that returns the post that the comment belongs to
//!4. Run a sample query that gets all comments and gets the post name
//!5. Set up a comments field on Post
//!6. Set up a resolver for the Post comments field that returns all comments belonging to that post
//!7. Run a sample query that gets all posts and all their comments

//TODO Comment Mutation

//TODO Goal: Allow clients to create a new comment

//!1. Define a new createComment mutation
//! - Should take text, author, post
//! - Should return a comment
//2. Define a resolver method for createComment
// - Confirm that the user exists and is published, else throw error
// - If they do exist, create the comment and return it
//3. Run the mutation and add a comment
//4. Use the commets query to verify the comment was added

//TODO Remove a post and relational data with a mutation

//* Dummy user data
let users = [{
  id: '1',
  name: 'Josh',
  email: 'joshuasevy@outlook.com',
  age: 38
}, {
  id: '2',
  name: 'Nicole',
  email: 'niki@gmail.com',
  age: 32
}, {
  id: '3',
  name: 'Hank',
  email: 'baby@gmail.com',
}
];

//* Dummy post data
let posts = [{
  id: '11',
  title: 'Post one of many',
  body: 'Here is my first post cant wait to post more',
  published: true,
  author: '1'
}, {
  id: '12',
  title: 'My second post',
  body: 'I can\'t believe this is already my second post',
  published: true,
  author: '1'
}, {
  id: '13',
  title: 'What should I write',
  body: 'Come on got fans to impress',
  published: false,
  author: '2'
}];

//Dummy comments data
let comments = [{
  id: '22',
  text: 'Really love your post',
  author: '1',
  post: '11'
}, {
  id: '23',
  text: 'Would love to discuss this more, interesting',
  author: '2',
  post: '12'
}, {
  id: '24',
  text: 'I have to disagree I prefer non relational structures',
  author: '3',
  post: '13'
}];

//* TYPE DEFINITIONS(schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    post: Post!
    me: User!
    comments: [Comment!]
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput!): Post!
    deletePost(id: ID!)
    createComment(data: CreateCommentInput!): Comment!
    deleteComment(id: ID!)
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!,
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]
    comments: [Comment!]
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`

//* RESOLVERS
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts
      }
      return posts.filter(post => {
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
    comments(parent, args, ctx, info) {
      return comments;
    },
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => user.email === args.data.email);
      if (emailTaken) {
        throw new Error('Email already in use!');
      }

      const user = {
        id: uuidv4(),
        ...args.data
      }

      users.push(user);

      return user
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex(user => user.id === args.id);

      if (userIndex === -1) {
        throw new Error('User not found!');
      }

      const deletedUser = users.splice(userIndex, 1);

      posts = posts.filter(post => {
        const match = post.author === args.id;

        if (match) {
          comments = comments.filter(comment => comment.post !== post.id);
        }

        return !match
      });
      comments = comments.filter(comment => comment.author !== args.id);

      return deletedUser;
    },
    createPost(parent, args, ctx, info) {
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
    deletePost(parent, args, ctx, info) {
      const postIndex = posts.indexOf(post => post.id === args.id);

      const deletedPost = posts.splice(postIndex, 1);

      comments = comments.filter(comment => comment.post !== args.id);

      return deletedPost;
    },
    createComment(parent, args, ctx, info) {
      const postPublished = posts.some(post => post.id === args.data.post && post.published);
      const userExists = users.some(user => user.id === args.data.author);

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

      comments.push(comment);
      return comment;
    }
  },
  deleteComment(parent, args, ctx, info){
    const commentIndex = comments.indexOf(comment => comment.id === args.id);

    const deletedComment = comments.splice(commentIndex, 1);


  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.post === parent.id)
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.author === parent.id);

    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find(post => post.id === parent.post);
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('The server is up! Running on port 4000');
});