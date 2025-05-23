const axios = require('axios');

// URL base dari server kamu
const BASE_URL = 'http://localhost:5001';

// ---------------- Task 10: Get all books (Async/Await + Callback) ----------------
async function getAllBooks(callback) {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    callback(null, response.data);
  } catch (error) {
    callback(error);
  }
}

// promisify getAllBooks supaya bisa dipanggil await
function getAllBooksAsync() {
  return new Promise((resolve, reject) => {
    getAllBooks((err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// ---------------- Task 11: Search by ISBN (Promises) ----------------
function searchByISBN(isbn) {
  return axios.get(`${BASE_URL}/isbn/${isbn}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

// ---------------- Task 12: Search by Author (Async/Await) ----------------
async function searchByAuthor(authorName) {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    const books = response.data;
    const filtered = Object.entries(books).filter(([_, book]) => 
      book.author.toLowerCase().includes(authorName.toLowerCase())
    );
    return Object.fromEntries(filtered);
  } catch (error) {
    throw error;
  }
}

// ---------------- Task 13: Search by Title (Async/Await) ----------------
async function searchByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    const books = response.data;
    const filtered = Object.entries(books).filter(([_, book]) => 
      book.title.toLowerCase().includes(title.toLowerCase())
    );
    return Object.fromEntries(filtered);
  } catch (error) {
    throw error;
  }
}

// ---------------- Contoh Penggunaan ----------------
(async () => {
  console.log("TASK 10 - GET ALL BOOKS");
  try {
    const allBooks = await getAllBooksAsync();
    console.log(allBooks);
  } catch (error) {
    console.error("Error getting all books:", error.message);
  }

  console.log("\nTASK 11 - SEARCH BY ISBN");
  try {
    const book = await searchByISBN(1);
    console.log(book);
  } catch (error) {
    console.error("Error searching by ISBN:", error.message);
  }

  console.log("\nTASK 12 - SEARCH BY AUTHOR");
  try {
    const results = await searchByAuthor("orwell");
    console.log(results);
  } catch (error) {
    console.error("Error searching by author:", error.message);
  }

  console.log("\nTASK 13 - SEARCH BY TITLE");
  try {
    const results = await searchByTitle("great");
    console.log(results);
  } catch (error) {
    console.error("Error searching by title:", error.message);
  }
})();
