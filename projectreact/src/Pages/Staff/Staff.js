import React from 'react';
import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import classes from './Staff.module.css';
import classes from '../Patients/Patients.module.css';
// import axios from '../../axios';
// import TableButton from '../../UI/TableButton/TableButton';
import Backdrop from '../../UI/Backdrop/Backdrop';
import StaffForms from './StaffForms/StaffForms';
import Scrollbar from "../../UI/Scrollbar/Scrollbar";
import Spinner from "../../UI/Spinner/Spinner";
import patientpic from "../../assets/images/patientpic.png";
import Patients from "../Patients/Patients";
import Card from "../../UI/Card/Card";
import Table from "../../Components/Table/Table";
import SearchBox from "../../UI/SearchBox/SearchBox";
import Button from "../../UI/Button/Button";
import LoginName from "../../UI/LoginName/LoginName";

class Staff extends Patients {    
    componentDidMount () {
        if (localStorage.getItem("userId"))
        this.onGetHandler("staff");
    };
    
    render () {
        return(
            <div>
                {localStorage.getItem("admin") === "Yes" ? null : <Redirect to='/error' />}
                <LoginName value={localStorage.getItem("firstName")} />
                <Backdrop show={this.state.openForms} clicked={() => { this.closeFormHandler("staff") }} />
                <StaffForms show={this.state.openForms} name={this.state.formType} id={this.state.formId} clicked={() => { this.closeFormHandler("staff") }} post={this.postDataHandler} />
                <SearchBox placeholder="Search staff's name, ID" value={this.state.searchValue} changed={(e) => {this.onSearchHandler(e)}} />
                <Button clicked={(e) => this.openFormHandler(e, 'Add')} value="Add Staff" />
                <div className={classes.patients}>
                    <Card src={process.env.PUBLIC_URL + "/assets/img/doctor.png"} number="45" value="Nurses"/>
                    <Card src={process.env.PUBLIC_URL + "/assets/img/doctor.png"} number="15" value="Doctors"/>
                    <Card src={process.env.PUBLIC_URL + "/assets/img/cleaners.png"} number="15" value="Cleaners"/>
                    <Card src={process.env.PUBLIC_URL + "/assets/img/patient.png"} number="17" value="Patients"/>
                    <div className={classes.cardBottomPatients}>
                        <h4>Staff list</h4><br/>                    
                        <Scrollbar>
                            <Table
                                headers={["Name", "Gender", "Email", "Admin", "Options"]} isLoaded={this.state.isLoaded}
                                rows={this.state.items} patientpic={patientpic}
                                clicked={(e) => this.openFormHandler(e, 'Edit')} delete={(e) => { this.onDeleteHandler(e, "staff") }} /> {/* <td>{item.jobDescription}</td> */} {/* <td>{item.phoneNumber}</td> */}
                            {this.state.isLoaded ? null : <Spinner />}
                        </Scrollbar>                    
                    </div>
                </div>
            </div>
        );
    };
}

export default Staff;