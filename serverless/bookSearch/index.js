const { ApolloServer, gql } = require("apollo-server-cloud-functions");
const mongoose = require("mongoose");
const Book = require("./model");

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI);

// Construct a schema using GraphQL schema language
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
`;

// Provide resolver functions for the schema
const resolvers = {
  Query: {
    getAllBooks: async () => await Book.find({}),
    getBook: async (_, args) => await Book.findById(args.id),
    searchBooks: async (_, { title, author, search }) => {
      let query = {};
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } },
        ];
      } else {
        if (title) {
          query.title = { $regex: title, $options: "i" };
        }
        if (author) {
          query.author = { $regex: author, $options: "i" };
        }
      }
      return await Book.find(query);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

exports.graphqlBooks = server.createHandler();
