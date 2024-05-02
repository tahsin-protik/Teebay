const { gql } = require('apollo-server-express');

const typeDefs = gql`
 type Buy {
    id: ID!
    product: Product!
    date: String!
    buyer: User!
    seller: User!
 }
 type Rent {
    id: ID!
    product: Product!
    dateFrom: String!
    dateTo: String!
    lender: User!
    borrower: User!
 }

 type Query {
    myTransactions: MyTransactions
 }

 type MyTransactions {
    bought: [Buy]
    sold: [Buy]
    lent: [Rent]
    borrowed: [Rent]
 }

 type Mutation {
    buyProduct(product_id: Int!): Buy
    rentProduct(product_id: Int!, date_from: String!, date_to: String!): Rent
 }
`;

module.exports = typeDefs;
