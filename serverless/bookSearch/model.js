const mongoose = require("mongoose");

// Define the schema for the book
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

// Create the model from the schema and export it
module.exports = mongoose.model("Book", BookSchema);
