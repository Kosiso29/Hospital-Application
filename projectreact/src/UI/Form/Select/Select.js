import React from 'react';

const select = (props) => {
    return (
        <>
            <label></label>
            <select name='gender' value={this.state.gender} onChange={(event) => this.setState({gender: event.target.value})}>
                <option disabled='disabled'>--Choose Option</option>
                <option>Male</option>
                <option>Female</option>
            </select>            
        </>
    );
};

export default select;