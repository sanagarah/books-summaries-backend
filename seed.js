const books = [
  {
    title: "The Great Gatsby Book",
    author: "F. Scott Fitzgerald",
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/845px-The_Great_Gatsby_Cover_1925_Retouched.jpg",
    summary:
      "The Great Gatsby, F. Scott Fitzgerald’s third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story is of the fabulously wealthy Jay Gatsby and his new love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted 'gin was the national drink and sex the national obsession,' it is an exquisitely crafted tale of America in the 1920s.",
  },
  {
    title: "To Kill a Mockingbird Book",
    author: "Harper Lee",
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/To_Kill_a_Mockingbird_%281963_US_theatrical_poster%29.jpg/776px-To_Kill_a_Mockingbird_%281963_US_theatrical_poster%29.jpg",
    summary:
      "To Kill a Mockingbird is a novel by Harper Lee published in 1960. Instantly successful, widely read in high schools and middle schools in the United States, the novel has become a classic of modern American literature. The plot and characters are loosely based on Lee's observations of her family, her neighbors, and an event that occurred near her hometown of Monroeville, Alabama, in 1936, when she was 10 years old. The story is told by the six-year-old Jean Louise Finch.",
  },
];

const mongoose = require("mongoose");
const Book = require("./models/Book");
require("dotenv").config();

const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const seedDB = async () => {
  await Book.deleteMany({});
  await Book.insertMany(books);
};

seedDB().then(() => {
  console.log("Database seeded!");
  mongoose.connection.close();
});
