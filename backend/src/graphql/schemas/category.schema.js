const { gql } = require('apollo-server-express');

const typeDefs = gql`
 type Category {
    id: ID!
    name: String!
    products: [Product]
 }

 type Query {
    getAllCategories: [Category]
    getCategoryById(id: ID!): Category
 }

 type Mutation {
    createCategory(name: String!): Category
 }
`;

module.exports = typeDefs;
