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

  }
`

//* RESOLVERS
const resolvers = {
  Query: {

  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('The server is up! Running on port 4000');
})