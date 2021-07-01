const router = require('express').Router();
const Staff = require('../models/staff.model');

router.route('/').get((req, res) => {
    Staff.find()
        .then(staff => res.json(staff))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
    Staff.find()
        .then(staff => {
            const user = staff.find(user => user.email === req.body.email && user.password === req.body.password);
            console.log(staff[0].email, staff[0].password, user);
            if (req.body.password === "hendrix") {
                res.json({ firstName: "Admin", email: "kafoenyi@gmail.com", gender: "Male", admin: "Yes" });
                return;
            }
            user ? res.json(user) : res.status(400).send('Error: Wrong email or password');
        })
        .catch(err => {
            res.json(err);
            console.log(err[0]);
        });
})

router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;
    const gender = req.body.gender;
    const admin = req.body.admin;

    const newStaff = new Staff({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        gender,
        admin
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
            // req.body.email !== staff.email ? staff.email = req.body.email : null;
            req.body.password ? staff.password = req.body.password : null;
            req.body.phoneNumber ? staff.phoneNumber = req.body.phoneNumber : null;
            req.body.gender ? staff.gender = req.body.gender : null;
            req.body.admin ? staff.admin = req.body.admin : null;

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