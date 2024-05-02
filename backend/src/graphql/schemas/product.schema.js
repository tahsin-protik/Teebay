const { gql } = require('apollo-server-express');

const typeDefs = gql`
 type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    rent_price: Float!
    date_posted: String
    categories: [Category]
 }

 type Query {
    getAllProducts: [Product]
    getProductById(id: ID!): Product
    listMyProducts: [Product]
 }

 type Mutation {
    createProduct(name: String!, description: String, price: Float!, rent_price: Float!, categories: [Int]): Product
    updateProduct(id: ID!, name: String, description: String, price: Float, rent_price: Float): Product
    deleteProduct(id: ID!): String
 }
`;

module.exports = typeDefs;