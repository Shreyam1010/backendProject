const Book = require('../models/book');

// Retrieve all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search books based on query parameters (ISBN, author, or title)
exports.searchBooks = async (req, res) => {
  try {
    const { isbn, author, title } = req.query;
    const query = {};

    if (isbn) query.isbn = isbn;
    if (author) query.author = { $regex: author, $options: 'i' }; 
    if (title) query.title = { $regex: title, $options: 'i' }; 

    const books = await Book.find(query);
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Retrieve a book by ISBN
exports.getBookByISBN = async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const book = await Book.findOne({ isbn });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Retrieve books by author
exports.getBooksByAuthor = async (req, res) => {
  try {
    const author = req.params.author;
    const books = await Book.find({ author: { $regex: author, $options: 'i' } }); 

    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found for this author' });
    }

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Retrieve books by title
exports.getBooksByTitle = async (req, res) => {
  try {
    const title = req.params.title;
    const books = await Book.find({ title: { $regex: title, $options: 'i' } }); 

    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found with this title' });
    }

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Retrieve reviews for a specific book by ISBN
exports.getBookReviews = async (req, res) => {
  try {
    const isbn = req.params.isbn;

    const book = await Book.findOne({ isbn }).populate('reviews'); 

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this book' });
    }

    res.status(200).json(book.reviews);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message });
  }
};


