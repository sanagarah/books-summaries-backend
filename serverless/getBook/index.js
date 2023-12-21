const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors")({ origin: true });
const Book = require("./model");

mongoose.connect(process.env.MONGODB_URI);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

exports.getBook = (req, res) => {
  cors(req, res, async () => {
    try {
      const bookId = req.query.id;

      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const book = await Book.findById(bookId);
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};
