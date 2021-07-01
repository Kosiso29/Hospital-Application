const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String },
    email: { type: String, required: true, unique: true, trim: true, minlength: 7 },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    gender: { type: String },
    admin: { type: String, required: true }
}, {
    timestamps: true
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;