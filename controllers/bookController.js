const Book = require("../models/Book");

// Create a new book
exports.createBook = async (req, res) => {
  const { title, author, cover, summary } = req.body;
  const book = new Book({
    title,
    author,
    cover,
    summary,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    Object.assign(book, req.body);
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
