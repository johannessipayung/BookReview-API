const express = require('express');
const books = require("./booksdb.js");
const { isValid, users } = require("./auth_users.js");
const public_users = express.Router();

// Register a new user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username or password not provided" });
  }

  if (!isValid(username)) {
    return res.status(400).json({ message: "This username is invalid" });
  }

  const userExists = users.some(user => user.username === username);

  if (userExists) {
    return res.status(409).json({ message: "Username already exists!" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User successfully registered!" });
});

// Get the book list available in the shop
public_users.get("/", async (req, res) => {
  try {
    return res.status(200).json(books);
  } catch (err) {
    return res.status(500).json({ message: "Unable to retrieve books!" });
  }
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async (req, res) => {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Get book details based on author
public_users.get("/author/:author", async (req, res) => {
  const author = req.params.author;
  const result = Object.values(books).filter(book => book.author === author);

  if (result.length > 0) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ message: "Books by this author not found" });
  }
});

// Get book details based on title
public_users.get("/title/:title", async (req, res) => {
  const title = req.params.title;
  const result = Object.values(books).filter(book => book.title === title);

  if (result.length > 0) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ message: "Books with this title not found" });
  }
});

// Get book review
public_users.get("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  if (books[isbn] && books[isbn].reviews) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "No reviews found for this book" });
  }
});

module.exports.general = public_users;
