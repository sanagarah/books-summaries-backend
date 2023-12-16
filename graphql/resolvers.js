const Book = require("../models/Book");

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
  Mutation: {
    deleteBook: async (_, { id }) => {
      try {
        const book = await Book.findById(id);
        if (!book) {
          throw new Error("Book not found");
        }
        await Book.deleteOne({ _id: id });
        return book;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};

module.exports = resolvers;
