const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Review Schema
const reviewSchema = new Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
}, { timestamps: true });

// Book Schema
const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  reviews: [
    {
      user: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true }
    }
  ]
});

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

module.exports = Book;  
