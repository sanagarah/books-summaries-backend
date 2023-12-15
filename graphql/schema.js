const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    cover: String!
    summary: String!
  }

  type Query {
    getAllBooks: [Book]
    getBook(id: ID!): Book
    searchBooks(title: String, author: String, search: String): [Book]
  }

  type Mutation {
    deleteBook(id: ID!): Book
  }
`;

module.exports = typeDefs;
