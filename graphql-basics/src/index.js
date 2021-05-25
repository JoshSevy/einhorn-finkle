import { GraphQLServer } from 'graphql-yoga';

//! 5 Scalar GraphQL Types: String, Boolean, Int, Float, ID

//* TYPE DEFINITIONS(schema)
const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }
`

//* RESOLVERS
const resolvers = {
  Query: {
    id() {
      return 'abc123'
    },
    name() {
      return 'Josh Sevy'
    },
    age() {
      return 38
    },
    employed() {
      return true
    },
    gpa() {
      return 3.3
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