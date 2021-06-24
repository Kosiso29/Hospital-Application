const router = require('express').Router();
const Patients = require('../models/patients.model');

router.route('/').get((req, res) => {
    Patients.find()
        .then(patients => res.json(patients))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const jobDescription = req.body.jobDescription;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const gender = req.body.gender;

    const newPatients = new Patients({
        firstName,
        lastName,
        jobDescription,
        email,
        phoneNumber,
        gender
    })

    newPatients.save()
        .then(() => res.json('Patient added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Patients.findById(req.params.id)
        .then(patients => res.json(patients))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Patients.findByIdAndDelete(req.params.id)
        .then(() => res.json('Patient deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req, res) => {
    Patients.findById(req.params.id)
        .then(patients => {
            req.body.firstName ? patients.firstName = req.body.firstName : null;
            req.body.lastName ? patients.lastName = req.body.lastName : null;
            req.body.jobDescription ? patients.jobDescription = req.body.jobDescription : null;
            req.body.email ? patients.email = req.body.email : null;
            req.body.phoneNumber ? patients.phoneNumber = req.body.phoneNumber : null;
            req.body.gender ? patients.gender = req.body.gender : null;

            patients.save()
                .then(() => res.json('Patient updated!'))
                .catch(err => res.status(400).json('Error: ' + err));

        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;