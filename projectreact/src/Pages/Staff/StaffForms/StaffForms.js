import React from 'react';
import PatientsForms from "../../Patients/PatientsForms/PatientsForms";
import classes from "../../Patients/PatientsForms/PatientsForms.module.css";
import Scrollbar from '../../../UI/Scrollbar/Scrollbar';
import close from '../../../assets/images/close.png';
import axios from '../../../axios';
import Login from '../../../UI/Login/Login';
import Image from "../../../UI/Form/Image/Image";
import Input from "../../../UI/Form/Input/Input";

class StaffForms extends PatientsForms {
    state = {
        firstName: '',
        email: '',
        password: '',
        phoneNumber: '',
        gender: 'Male',
        submitted: false,
        loggedIn: false,
        runComponentDidUpdateOnce: true
    }

    componentDidUpdate() {
        if (this.props.id && this.state.runComponentDidUpdateOnce) {
            this.setState({ runComponentDidUpdateOnce: false });
            axios.get(`/staff/${this.props.id}`)
                .then((response) => {
                this.setState({
                    firstName: response.data.firstName + ' ' + response.data.lastName,
                    email: response.data.email,
                    password: response.data.password,
                    phoneNumber: response.data.phoneNumber,
                    gender: response.data.gender
                });
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    postDataHandler = () => {
        let add = 'add';
        if (this.props.id) add = this.props.id;
        const dataName = this.state.firstName.split(' ');
        const data = {
            firstName: dataName[0],
            lastName: dataName[1],
            email: this.state.email,
            password: this.state.password || "123456",
            phoneNumber: this.state.phoneNumber || "08064954840",
            gender: this.state.gender || "Male"
        };
        this.setState({submitted: true});
        axios.post(`/staff/${add}`, data)
            .then(() => {
                this.setState({submitted: false});
            })
            .then(() => {
                this.setState({
                    firstName: '',
                    email: '',
                    password: '',
                    phoneNumber: '',
                    gender: 'Male',
                    loggedIn: true
                });
            })
            .catch(error => {
                this.setState({submitted: false});
                console.log(error);
            });
    }

    render () {
        if (this.state.loggedIn) {
            setTimeout(() => {
                this.setState({loggedIn: false})
            }, 500);
        }
        return (
            <div className={this.props.show ? classes.PatientsForms : classes.PatientsForms + ' ' + classes.active}>
                {this.state.loggedIn ? <Login login='block' text="Successful" /> : null}
                {this.state.submitted ? <Login spinner='show' login='none' /> : null}
                <h1>{this.props.name} Staff <img src={close} onClick={this.props.clicked} alt='' /></h1>
                <Scrollbar>
                    <form>
                        <Image classes={classes.picture} title={"Profile Picture"} src={process.env.PUBLIC_URL + "/assets/img/patient.png"} />
                        <Input title={"Name"} value={this.state.firstName} changed={(event) => this.setState({firstName: event.target.value})} />
                        <Input title={"Email Address"} value={this.state.email} changed={(event) => this.setState({email: event.target.value})} />
                        <Input inputType={true} title={"Gender"} select={["Male", "Female"]} value={this.state.gender} changed={(event) => this.setState({gender: event.target.value})} />
                        <Input title={"Password"} value={this.state.password} changed={(event) => this.setState({password: event.target.value})} />
                        {/* <Input style={{width: '100%'}} title={"Address"} value={this.state.address} changed={(event) => this.setState({address: event.target.value})} /> */}
                        <Input classes={classes.telephone} title={"Telephone"} value={this.state.phoneNumber} changed={(event) => this.setState({phoneNumber: event.target.value})} />
                        {/* <Input classes={classes.blood} style={{width: '100%'}} inputType={true} title={"Blood Group"} select={["A", "B", "AB", "O"]}/> */}
                    </form>
                    <button className={classes.create} onClick={this.postDataHandler}>{this.props.name} Staff</button>
                </Scrollbar>
            </div>
        );
    }
}

export default StaffForms;