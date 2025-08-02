const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    DressName: String,
    Prize: String,
    crossed: String,
    off: String,
    discription: String,
    image: String,
    categories: [String],
    cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Reference to products in cart
    wishlistItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] // Reference to products in wishlist
});

const CardModel = mongoose.model("Card", CardSchema); // Changed "card" to "Card"

module.exports = CardModel;
