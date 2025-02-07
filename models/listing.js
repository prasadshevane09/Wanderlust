const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
       url: String,
       filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }], // Define reviews as an array of subdocuments,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post('findOneAndDelete', async function (listing) {
    if (listing.reviews.length) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

module.exports = mongoose.model('Listing', listingSchema);