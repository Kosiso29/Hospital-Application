import React from 'react';
import classes from './Login.module.css';
import Login from '../../assets/images/login.png';
import Failed from "../../assets/images/failed.png";
import Spinner from '../Spinner/Spinner';

const login = (props) => (
    <div className={classes.Login}>
        <div style={{display: props.login}}>
            {props.text === 'Successful' || props.text === 'Login Successful' ? <img src={Login} alt='' /> : <img src={Failed} alt='' />}
            <p>{props.text}</p>
        </div>
        {props.spinner ? <Spinner /> : null}
    </div>
);

export default login;