const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String },
    email: { type: String, require: true, unique: true, trim: true, minlength: 7 },
    password: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    gender: { type: String }
}, {
    timestamps: true
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;