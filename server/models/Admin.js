const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: Date,
    age: Number,
    phoneNumber: String,
    address: String
});

const AdminModel = mongoose.model("admin", AdminSchema);

module.exports = AdminModel;
