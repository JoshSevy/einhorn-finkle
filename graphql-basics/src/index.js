import { GraphQLServer } from 'graphql-yoga';

//! 5 Scalar GraphQL Types: String, Boolean, Int, Float, ID

//Challenge 4
/*
Create a Post type
Add id, title, body, and published to the post type (all non-nullable)
Define a post query that returns a single post
Test out the query
 **/

//! Challenge 5
//! Create an 'add' query that returns a Float
//! Setup 'add' to take in two arguments, which are required Floats
//! Have the resolver send back the sum of both arguments

//* TYPE DEFINITIONS(schema)
const typeDefs = `
  type Query {
    add(a: Float!, b: Float!): Float
    greeting(name: String): String!
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
    add(parent, args, ctx, info) {
      return (args.a && args.b)? args.a + args.b : null
    },
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello ${args.name}`
      }
      return 'Hello!'
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