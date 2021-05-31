import { GraphQLServer } from 'graphql-yoga';

//! 5 Scalar GraphQL Types: String, Boolean, Int, Float, ID
//! Module challenge 1
//1. Set up a "Comment" type with id and text fields. Non-nullable
//2. Set up a "comments" array with a comments
//3. Set up a "comments" query with a resolver that returns all the comments
//4. Run a query to get all a comments with both id and text fields.
//* Dummy user data
const users = [{
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
const posts = [{
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
const comments = [{
  id: '22',
  text: 'Really love your post'
}, {
  id: '23',
  text: 'Would love to discuss this more, interesting'
}, {
  id: '24',
  text: 'I have to disagree I prefer non relational structures'
}];

//* TYPE DEFINITIONS(schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    post: Post!
    me: User!
    comments: [Comments!]
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]
  }

  type Comments {
    id: ID!
    text: String!
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
    comments() {
      return comments;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => post.author === parent.id);
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