const express = require('express');
const {
  getAllBooks,
  searchBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  getBookReviews
} = require('../controllers/bookController');
const router = express.Router();

// Route to get all books
router.get('/', getAllBooks);

// Route to search books by isbn, author, or title
router.get('/search', searchBooks);

// Route to get a book by ISBN
router.get('/isbn/:isbn', getBookByISBN);

// Route to get books by author
router.get('/author/:author', getBooksByAuthor);

// Route to get books by title
router.get('/title/:title', getBooksByTitle);

// Route to get reviews for a book by ISBN
router.get('/reviews/isbn/:isbn', getBookReviews);

module.exports = router;
