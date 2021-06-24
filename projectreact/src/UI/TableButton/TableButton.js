import React from 'react';
import classes from './TableButton.module.css'

const tablebutton = (props) => (
    <div className={classes.dropdown}>
        <button onClick={props.clicked} className={classes.dropbtn}>Edit Profile</button>
        <div className={classes.dropdownContent}>
            <p>Medical History</p>
            <p>Bills</p><hr></hr>
            <p style={{color: 'red'}}>Delete</p>
        </div>
    </div>
);

export default tablebutton;