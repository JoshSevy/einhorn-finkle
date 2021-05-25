import { GraphQLServer } from 'graphql-yoga';

//! 5 Scalar GraphQL Types: String, Boolean, Int, Float, ID

//Challenge 4
/*
Create a Post type
Add id, title, body, and published to the post type (all non-nullable)
Define a post query that returns a single post
Test out the query
 **/

//* TYPE DEFINITIONS(schema)
const typeDefs = `
  type Query {
    post: Post!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Int!
  }

`

//* RESOLVERS
const resolvers = {
  Query: {
    post() {
      return {
        id: 234,
        title: 'Challenge 4',
        body: 'Look at me completing challenge 4 easily',
        published: 2021
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