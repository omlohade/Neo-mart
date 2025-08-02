const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: Date,
    age: Number,
    phoneNumber: String,
    address: String
});

const CustomerModel = mongoose.model("customers", CustomerSchema);

module.exports = CustomerModel;
