# Book Review API with Authentication

## Project Description

This project is a **Node.js RESTful API** for a book review platform where both general users and registered users can interact with an online bookstore. Users can **browse books**, **search by ISBN, Author, or Title**, and **read book reviews**. Registered users have additional privileges to **add, update, and delete their own reviews**.

The API uses **JWT (JSON Web Tokens)** for secure authentication and **Express.js** for routing and middleware. Sessions are managed with `express-session`.

---

## Features

- 📚 Retrieve the complete list of books available in the store  
- 🔍 Search books by ISBN, Author, or Title  
- 📝 Read public book reviews  
- 🧑‍💻 Register new users and login with JWT authentication  
- ✍️ Authenticated users can add, update, and delete their own book reviews  
- 🔐 Secure routes accessible only to logged-in users  
- 💻 Axios usage examples with async/await and Promises for client requests

---

## Technology Stack

- Node.js  
- Express.js  
- JSON Web Tokens (JWT)  
- express-session for session handling  
- Axios (for client HTTP requests)  
- JavaScript in-memory storage (`booksdb.js`) for book data and reviews

---

