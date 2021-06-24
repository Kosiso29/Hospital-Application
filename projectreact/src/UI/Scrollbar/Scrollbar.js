import React from 'react';
import classes from './Scrollbar.module.css';

const scrollbar = (props) => (
    <div className={classes.scrollbar} id={classes.style15}>
        {props.children}
    </div>
);

export default scrollbar;