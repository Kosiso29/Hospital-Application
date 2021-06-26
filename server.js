const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

// require('dotenv').config();
require("dotenv").config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const patientsRouter = require('./routes/patients')

app.use('/HospitalApp/api/v1/exercises', exercisesRouter);
app.use('/HospitalApp/api/v1/users', usersRouter);
app.use('/HospitalApp/api/v1/patients', patientsRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/projectreact/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'projectreact', 'build', 'index.html'));
    })
} else {
    app.get('/', (req, res) => {
        res.send('API is running');
    });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});