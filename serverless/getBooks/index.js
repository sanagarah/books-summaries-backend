const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors")({ origin: true });
const Book = require("./model");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Cloud Function to get all books
exports.getAllBooks = (req, res) => {
  cors(req, res, async () => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};
