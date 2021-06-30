import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import Spinner from '../../UI/Spinner/Spinner';
import axios from '../../axios';
import classes from './Patients.module.css';
import patientpic from '../../assets/images/patientpic.png';
import Scrollbar from '../../UI/Scrollbar/Scrollbar';
// import TableButton from '../../UI/TableButton/TableButton';
import Backdrop from '../../UI/Backdrop/Backdrop';
import PatientsForms from './PatientsForms/PatientsForms';
import Card from "../../UI/Card/Card";
import Table from "../../Components/Table/Table";
import SearchBox from "../../UI/SearchBox/SearchBox";
import Button from "../../UI/Button/Button";
// import Patient from './Patient/Patient';

class Patients extends Component {
    state = {
        items: [],
        isLoaded: false,
        openForms: false,
        formType: "",
        formId: ""
    }
    
    componentDidMount () {
        this.onGetHandler("patients");
    };

    closeFormHandler = () => {
        this.setState({openForms: false});
    }

    openFormHandler = (e, input) => {
        this.setState({ openForms: true, formType: input });
        if (input === 'Edit') {
            this.setState({ formId: e.target.closest('tr').id });
        } else {
            this.setState({ formId: "" });
        }
    }

    onGetHandler = (input) => {
        axios.get(`/${input}`)
            .then(response => {
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
    }

    onEditHandler = (e) => {
        e.target.nextSibling.style.display === "none" ? e.target.nextSibling.style.display = "block" : e.target.nextSibling.style.display = "none";
        console.log('editHandler', this.state.editTable, e.target.textContent, e.target.nextSibling.style.display);
    };

    onDeleteHandler = (e, input) => {
        const itemId = e.target.closest('tr').id;
        this.setState({
            isLoaded: false
        });
        axios.delete(`/${input}/${itemId}`)
            .then(() => {this.onGetHandler(input)})
            .catch(err => {
                console.log(err);
                this.setState({
                    isLoaded: true
                });
            });
    }

    render () {
        return(
            <div>
                <Backdrop show={this.state.openForms} clicked={this.closeFormHandler} />
                <PatientsForms show={this.state.openForms} name={this.state.formType} id={this.state.formId} clicked={this.closeFormHandler} post={this.postDataHandler} />
                <SearchBox placeholder="Search patient's name, ID" />
                <Button clicked={(e) => this.openFormHandler(e, 'Add')} value="Add Patient" />
                <div className={classes.patients}>
                    <Card src={process.env.PUBLIC_URL + "/assets/img/visits.png"} number="17" value="Average Visits"/>
                    <Card src={process.env.PUBLIC_URL + "/assets/img/patient.png"} number="45" value="Patients"/>
                    <Card src={process.env.PUBLIC_URL + "/assets/img/discharged.png"} number="12" value="Discharged"/>
                    <Card src={process.env.PUBLIC_URL + "/assets/img/donor.png"} number="67" value="Blood Donors"/>
                    <div className={classes.cardBottomPatients}>
                        <h4>Patients list</h4><br/>                    
                        <Scrollbar>
                            <Table
                                headers={["Name", "Gender", "Email", "Options"]} isLoaded={this.state.isLoaded}
                                rows={this.state.items} patientpic={patientpic}
                                clicked={(e) => this.openFormHandler(e, 'Edit')} delete={(e) => { this.onDeleteHandler(e, "patients") }} /> {/* <td>{item.jobDescription}</td> */} {/* <td>{item.phoneNumber}</td> */}
                            {this.state.isLoaded ? null : <Spinner />}
                        </Scrollbar>                    
                    </div>
                </div>
            </div>
        );
    }
}

export default Patients;