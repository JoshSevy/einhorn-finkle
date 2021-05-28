import { GraphQLServer } from 'graphql-yoga';

//! 5 Scalar GraphQL Types: String, Boolean, Int, Float, ID

//* Demo user data
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

const posts = [{
  id: '11',
  title: 'Post one of many',
  body: 'Here is my first post cant wait to post more',
  published: true
}, {
  id: '12',
  title: 'My second post',
  body: 'I can\'t believe this is already my second post',
  published: true
}, {
  id: '13',
  title: 'What should I write',
  body: 'Come on got fans to impress',
  published: false
}];

//! Challenge
// 1. Setup an array of posts with dummy post data(id, title, body, published)
// 2. Set up a 'posts' query and resolver that returns all the posts
// 3. Test the query
// 4. Add a "query" arg that only returns posts that contain the query string in the title or body
// 5. Run a few sample queries searching for posts with a specific title

//* TYPE DEFINITIONS(schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts: [Post!]!
    post: Post!
    me: User!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
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
    posts() {
      return posts
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