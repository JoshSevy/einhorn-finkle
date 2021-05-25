import { GraphQLServer } from 'graphql-yoga';

// TYPE DEFINITIONS(schema)
const typeDefs = `
  type Query {
    hello: String!
    name: String!
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