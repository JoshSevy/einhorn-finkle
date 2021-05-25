import { GraphQLServer } from 'graphql-yoga';

// TYPE DEFINITIONS(schema)
const typeDefs = `
  type Query {
    hello: String!
  }
`


// RESOLVERS
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query!'
    }
  }
}