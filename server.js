const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/userRoutes");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const app = express();

// Permissive CORS configuration
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "*",
    credentials: true,
  })
);

app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//GraphQL
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
}

startServer();

//REST
app.use("/api/books", bookRoutes);
app.use("/api/users", authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
