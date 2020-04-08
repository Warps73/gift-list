const db = require('./db');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const {GraphQLServer} = require('graphql-yoga');

// Create the graphql yoga server

function createServer() {
    return new GraphQLServer({
        typeDefs: 'src/schema.graphql',
        resolvers: {
            Mutation,
            Query
        },
        resolverValidationOptions: {
            requireResolversForResolveType: false
        },
        context: req => ({...req, db}),
    })
}

module.exports = createServer;
