import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../UI/Spinner/Spinner';
import axios from '../../axios';
import classes from './Patients.module.css';
import patientpic from '../../assets/images/patientpic.png';
import Scrollbar from '../../UI/Scrollbar/Scrollbar';
import TableButton from '../../UI/TableButton/TableButton';
import Backdrop from '../../UI/Backdrop/Backdrop';
import PatientsForms from './PatientsForms/PatientsForms';
// import Patient from './Patient/Patient';

class Patients extends Component {
    state = {
        items: [],
        isLoaded: false,
        openForms: false
    }
    
    closeFormHandler = () => {
        this.setState({openForms: false});
    }

    openFormHandler = () => {
        this.setState({openForms: true});
        console.log(window.location.pathname);
    }

    componentDidMount () {
        // axios.get('/GetAllUser')
        axios.get('/patients')
            .then(response => {
                console.log(response.data, response.data[0], response.data[0]._id);
                this.setState({
                    isLoaded: true,
                    items: response.data
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isLoaded: true
                });
            });
    };

    render () {
    return(
        <div>
                <Backdrop show={this.state.openForms} clicked={this.closeFormHandler} />
                <PatientsForms show={this.state.openForms} clicked={this.closeFormHandler} post={this.postDataHandler} />
                <div className={classes.searchBox}>
                    <input className={classes.searchTxt} type='text' placeholder="Search patient's name, ID" />
                    <Link className={classes.searchBtn} to='#'></Link>
                </div>
                <div className={classes.buttonPatients}>
                    <button onClick={this.openFormHandler} >Add Patient</button>
                </div>
                
                <div className={classes.patients}>
                    <div className={classes.cardStat}>
                        <img src={process.env.PUBLIC_URL + "/assets/img/visits.png"} alt='' />
                        <h4>17</h4><p>Average Visits</p>
                    </div>
                    <div className={classes.cardStat}>
                        <img src={process.env.PUBLIC_URL + "/assets/img/patient.png"} alt='' />
                        <h4>45</h4><p>Patients</p>
                    </div>
                    <div className={classes.cardStat}>
                        <img src={process.env.PUBLIC_URL + "/assets/img/discharged.png"} alt='' />
                        <h4>12</h4><p>Discharged</p>
                    </div>
                    <div className={classes.cardStat}>
                        <img src={process.env.PUBLIC_URL + "/assets/img/donor.png"} alt='' />
                        <h4>67</h4><p>Blood Donors</p>
                    </div>
                    <div className={classes.PatientsTable + ' ' + classes.cardBottomPatients}>
                        <h4>Patient list</h4><br></br>
                        
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
                                    <tr key={item._id}>
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
                </div>
        </div>
    );
}
}

export default Patients;