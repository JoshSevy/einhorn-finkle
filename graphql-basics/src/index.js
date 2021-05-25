import { GraphQLServer } from 'graphql-yoga';

//! 5 Scalar GraphQL Types: String, Boolean, Int, Float, ID

//Challenge 3
/*
Create query defs and resolvers for each
title - string product name
price - float product price
releaseYear - optional number as int
rating - optional number as float
inStock - boolean
 **/

//* TYPE DEFINITIONS(schema)
const typeDefs = `
  type Query {
    me: User!
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
    me() {
      return {
        id: 234,
        name: "Josh Sevy",
        email: "joshuasevy@outlook.com",
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
})