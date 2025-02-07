const Listing = require("../models/listing");
const Review = require("../models/review");

// create Review
module.exports.createReview = async (req, res) => 
    {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    
    await newReview.save(); // Save the review to the database
    await listing.save(); // Save the listing with the new review
    req.flash("success", "New review Created");
    res.redirect(`/listings/${listing._id}`);
};

// delete Review
module.exports.destroyReview = async (req, res) => 
    {       
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);   
    req.flash("success", "review Deleted");
    res.redirect(`/listings/${id}`);
};