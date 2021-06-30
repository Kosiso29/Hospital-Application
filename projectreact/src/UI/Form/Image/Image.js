import React from 'react';

const image = (props) => {
    return (
        <div className={props.classes}>
            <label>{props.title}</label>
            <img src={props.src} alt={props.title} />
            <button type='submit'>Select Image</button>
        </div>
    );
};

export default image;