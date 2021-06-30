import React from "react";
import classes from "./Card.module.css";

const card = (props) => (
    <div className={classes.cardStat + " " + props.style}>
        <img src={props.src} alt={props.value} />
        <h4>{props.number}</h4><p>{props.value}</p>
    </div>
);

export default card;