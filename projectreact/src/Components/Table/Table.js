import React from "react";
import TableButton from "../../UI/TableButton/TableButton";

const table = (props) => (
    <div style={{ maxHeight: '400px' }}>
        <table>
            <thead>
                <tr>
                    {props.headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.isLoaded ?
                    props.rows.map(item => (
                        <tr id={item._id} key={item._id}>
                            <td style={{ display: 'table-cell' }}><img src={props.patientpic} width='25' alt={item.firstName + ' ' + item.lastName} />  <p style={{ display: 'inline-block', verticalAlign: 'top' }}>{item.firstName + ' ' + item.lastName}</p></td>
                            <td>{item.gender}</td>
                            <td>{item.email}</td>
                            <td><TableButton clicked={props.clicked} delete={props.delete} /></td>
                        </tr>
                    )) : null}
            </tbody>
        </table>
    </div>
);

export default table;