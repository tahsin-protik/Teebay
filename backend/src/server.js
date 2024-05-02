const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const { prisma } = require('./db');
const {authenticateJWT} = require('./middlewares/authMiddleware.js');

const server = new ApolloServer({ typeDefs, 
    resolvers, 
    context: request => {
        return { prisma, ...request } } 
    });
const app = express();

app.use(authenticateJWT);

server.start().then(() => {
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
});