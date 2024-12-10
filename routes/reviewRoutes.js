const express = require('express');
const { addBookReview, modifyBookReview ,deleteBookReview} = require('../controllers/reviewController'); 
const router = express.Router();

router.post('/add', addBookReview);
router.put('/modify', modifyBookReview);
router.delete('/delete', deleteBookReview); 


module.exports = router;
