const { gql } = require('apollo-server-express');

const typeDefs = gql`
 type User {
   id: ID!
   first_name: String
   last_name: String
   address: String
   email: String
   phone: String
   password: String
 }
 type AuthPayload {
    token: String
    user: User
  }

 type Query {
    user(id: ID!): User
    myProfile: User
 }
 
 type Mutation {
      signup(first_name: String!, last_name: String!, address: String!, email: String!, phone: String!, password: String!): AuthPayload
      login(email: String!, password: String!): AuthPayload
}
`;


module.exports = typeDefs;