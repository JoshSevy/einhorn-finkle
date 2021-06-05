//THIRD PARTY IMPORTS
import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
//CUSTOM IMPORTS
import db from './db';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db
  }
});

server.start(() => {
  console.log('The server is up! Running on port 4000');
});