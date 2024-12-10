const Review = require('../models/review');
const Book = require('../models/book'); 

// Add a new review for a book
exports.addBookReview = async (req, res) => {
  try {
    const { isbn, user, comment, rating } = req.body;
    const book = await Book.findOne({ isbn });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const newReview = { user, comment, rating };
    book.reviews.push(newReview);
    await book.save();
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Modify an existing review
exports.modifyBookReview = async (req, res) => {
  try {
    const { isbn, user, comment, rating } = req.body;
    const book = await Book.findOne({ isbn });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const review = book.reviews.find(r => r.user === user);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.comment = comment;
    review.rating = rating;
    await book.save();
    res.status(200).json({ message: 'Review updated successfully', review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a review for a specific book by a user
exports.deleteBookReview = async (req, res) => {
  try {
    const { isbn, user } = req.body; // Expecting ISBN and user information in the request body

    // Find the book by ISBN
    const book = await Book.findOne({ isbn });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Find the review by the user
    const reviewIndex = book.reviews.findIndex((rev) => rev.user === user);
    if (reviewIndex === -1) {
      return res.status(404).json({ message: 'Review not found for this user' });
    }

    // Remove the review
    book.reviews.splice(reviewIndex, 1);
    await book.save();

    res.status(200).json({ message: 'Book review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

