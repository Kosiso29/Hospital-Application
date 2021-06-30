import React from 'react';
import classes from "./SearchBox.module.css";
import { Link } from 'react-router-dom';

const searchBox = (props) => (
    <div className={classes.searchBox}>
        <input className={classes.searchTxt} type='text' placeholder={props.placeholder} />
        <Link className={classes.searchBtn} to='#'></Link>        
    </div>
);

export default searchBox;