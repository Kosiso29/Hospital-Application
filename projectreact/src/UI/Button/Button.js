import React from 'react';
import classes from "./Button.module.css";

const button = (props) => (
    <div className={classes.buttonPatients}>
        <button onClick={props.clicked} >{props.value}</button>
    </div>
);

export default button;