import React from 'react';

const input = (props) => {
    return (
        <div className={props.classes || ""}>
            {props.inputType ? (<>
                <label>{props.title}</label>
                <select name={props.title.split(" ")[0]} style={props.style || {display: "block"}}
                    value={props.value} onChange={props.changed}>
                    {/* <option disabled='disabled'>--Choose Option</option> */}
                    {props.select.map((value, index) => (
                        <option key={index}>{value}</option>
                    ))}
                </select>
            </>) :
                (<>
                    <label>{props.title}</label>
                    <input type={props.type || "text"} name={props.title.split(" ")[0]} style={props.style || {}}
                        value={props.value} onChange={props.changed} />
                </>)}
        </div>
    );
};

export default input;