import React from 'react';
import classes from './Patient.module.css';

const patient = (props) => (
    <div className={classes.PatientModule}>
        <img src={process.env.PUBLIC_URL + "/assets/img/patient.png"} alt='' />
        <p>{props.name}</p>
        <p>{props.id}</p>
        <p>{props.email}</p>
    </div>
);

export default patient;