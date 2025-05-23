const express = require('express');
const jwt = require('jsonwebtoken');
const books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{ username: 'user3', password: 'pass123' }];

// Validate username
const isValid = (username) => {
  return typeof username === 'string' && username.length > 1 && username.length < 14;
};

// Check if user is authenticated
const authenticatedUser = (username, password) => {
  return users.some(user => user.username === username && user.password === password);
};

// Login route
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username or password is missing" });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const accessToken = jwt.sign({ username }, 'access', { expiresIn: '1h' });
  req.session.authorization = { accessToken, username };

  return res.status(200).json({ message: "Login successful!" });
});

// Add or update a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;

  if (!review) {
    return res.status(400).json({ message: "Review content is missing!" });
  }

  if (!req.session.authorization) {
    return res.status(401).json({ message: "User not logged in!" });
  }

  const { accessToken, username } = req.session.authorization;

  jwt.verify(accessToken, 'access', (err) => {
    if (err) {
      return res.status(403).json({ message: "Could not verify user" });
    }

    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found!" });
    }

    books[isbn].reviews[username] = review;

    return res.status(200).json({ message: "Review added/updated successfully", reviews: books[isbn].reviews });
  });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  if (!req.session.authorization) {
    return res.status(401).json({ message: "User not logged in!" });
  }

  const { accessToken, username } = req.session.authorization;

  jwt.verify(accessToken, 'access', (err) => {
    if (err) {
      return res.status(403).json({ message: "Could not verify user" });
    }

    if (books[isbn] && books[isbn].reviews && books[isbn].reviews[username]) {
      delete books[isbn].reviews[username];
      return res.status(200).json({ message: "Review deleted successfully.", reviews: books[isbn].reviews });
    } else {
      return res.status(404).json({ message: "No review found for this user to delete." });
    }
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
