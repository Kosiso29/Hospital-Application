const router = require('express').Router();
const Staff = require('../models/staff.model');

router.route('/').get((req, res) => {
    Staff.find()
        .then(staff => res.json(staff))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;
    const gender = req.body.gender;

    const newStaff = new Staff({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        gender
    });

    newStaff.save()
        .then(() => res.json('Staff added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Staff.findById(req.params.id)
        .then(staff => res.json(staff))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req, res) => {
    Staff.findById(req.params.id)
        .then(staff => {
            req.body.firstName ? staff.firstName = req.body.firstName : null;
            req.body.lastName ? staff.lastName = req.body.lastName : null;
            req.body.email ? staff.email = req.body.email : null;
            req.body.password ? staff.password = req.body.password : null;
            req.body.phoneNumber ? staff.phoneNumber = req.body.phoneNumber : null;
            req.body.gender ? staff.gender = req.body.gender : null;

            staff.save()
                .then(() => res.json('Staff updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Staff.findByIdAndDelete(req.params.id)
        .then(() => res.json('Staff deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;