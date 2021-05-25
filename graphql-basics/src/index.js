import { GraphQLServer } from 'graphql-yoga';

// TYPE DEFINITIONS(schema)
const typeDefs = `
  type Query {
    hello: String!
    name: String!
    location: String!
    bio: String!
  }
`


// RESOLVERS
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query!'
    },
    name() {
      return 'Josh Sevy'
    },
    location() {
      return 'Denver, CO'
    },
    bio() {
      return 'I love learning'
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