import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './Staff.module.css';
import axios from '../../axios';
import TableButton from '../../UI/TableButton/TableButton';
import Scrollbar from "../../UI/Scrollbar/Scrollbar";
import Spinner from "../../UI/Spinner/Spinner";
import patientpic from "../../assets/images/patientpic.png";

class Staff extends Component {

    state = {
        items: [],
        isLoaded: false,
        openForms: false
    }

    componentDidMount () {
        axios.get('/GetAllUser')
            .then(response => {
                this.setState({
                    isLoaded: true,
                    items: response.data
                });
            });
    };

    render () {
    return(
        <>
            <div className={classes.searchBox}>
                    <input className={classes.searchTxt} type='text' placeholder="Search staff's name, ID" />
                    <Link className={classes.searchBtn} to='#'></Link>
                </div>
                <div className={classes.buttonStaff}>
                    <button type='submit'>Add Staff</button>
                </div>
                
                <div className={classes.staff}>
                    <div className={classes.cardStat}>
                        <img src={process.env.PUBLIC_URL + "/assets/img/doctor.png"} alt='' />
                        <h4>45</h4><p>Nurser</p>
                        
                    </div>
                    <div className={classes.cardStat}>
                        <img src={process.env.PUBLIC_URL + "/assets/img/doctor.png"} alt='' />
                        <h4>15</h4><p>Doctors</p>
                    </div>
                    <div className={classes.cardStat}>
                        <img src={process.env.PUBLIC_URL + "/assets/img/cleaners.png"} alt='' />
                        <h4>15</h4><p>Cleaners</p>
                    </div>
                    <div className={classes.cardStat}>
                        <img src={process.env.PUBLIC_URL + "/assets/img/patient.png"} alt='' />
                        <h4>17</h4><p>Patients</p>
                    </div>
                    <div className={classes.cardBottomStaff}>
                        <h4>Staff list</h4><p></p>
                        <Scrollbar>
                            <div style={{maxHeight: '400px'}}>
                            <table>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Email</th>
                                    {/* <th>Job Description</th> */}
                                    {/* <th>Phone Number</th> */}
                                    <th>Options</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.isLoaded ? 
                                this.state.items.map(item => (
                                    <tr key={item.userId}>
                                        <td style={{display: 'table-cell'}}><img src={patientpic}  width='25' alt=''/>  <p style={{display: 'inline-block', verticalAlign: 'top'}}>   {item.firstName + ' ' + item.lastName}</p></td>
                                        <td>{item.gender}</td>
                                        <td>{item.email}</td>
                                        {/* <td>{item.jobDescription}</td> */}
                                        {/* <td>{item.phoneNumber}</td> */}
                                        <td><TableButton /></td>
                                    </tr>
                                )) : null}
                                </tbody>
                            </table>
                            </div>
                            {this.state.isLoaded ? null : <Spinner />}
                        </Scrollbar>
                    </div>
                    {/* <div className={classes.cardStat}>
                        Calender
                    </div> */}
                    {/* <h1>Dashboard</h1> */}
                </div>
        </>
    );
}
}

export default Staff;