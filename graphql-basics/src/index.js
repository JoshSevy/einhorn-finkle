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
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
  }
`

//* RESOLVERS
const resolvers = {
  Query: {
    title() {
      return 'Klean Kanteen'
    },
    price() {
      return 29.99
    },
    releaseYear() {
      return null
    },
    rating() {
      return 4.5
    },
    inStock() {
      return true
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