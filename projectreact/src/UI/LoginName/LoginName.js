import React from 'react';
import classes from "./LoginName.module.css";

const loginName = (props) => {
    return (
        <p className={classes.loginName}>{props.value}</p>
    );
};

export default loginName;