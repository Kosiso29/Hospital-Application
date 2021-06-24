const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientsSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    jobDescription: { type: String },
    email: { type: String, require: true },
    phoneNumber: { type: String },
    gender: { type: String }
}, {
    timestamps: true
});

const Patients = mongoose.model('Patients', patientsSchema);

module.exports = Patients;