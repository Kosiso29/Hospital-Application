import React, { Component } from 'react';
import classes from './PatientsForms.module.css';
import Scrollbar from '../../../UI/Scrollbar/Scrollbar';
import close from '../../../assets/images/close.png';
import axios from '../../../axios';
import Login from '../../../UI/Login/Login';

class patientsforms extends Component {
    state = {
        firstName: '',
        gender: '',
        email: '',
        date_of_birth: '',
        address: '',
        phoneNumber: '',
        submitted: false,
        loggedIn: false
    }

    componentDidMount () {
        // if auth== false this.props.history.replace('/posts');
        // console.log(this.props);
    }

    postDataHandler = () => {
        const data = {
            firstName: this.state.firstName,
            lastName: "Afoenyi",
            jobDescription: "FSE",
            email: this.state.email,
            phoneNumber: "09062072225",
            gender: this.state.gender
        };
        // this.setState((prevState) => {
        //     return {firstName: prevState.firstName}
        // });
        this.setState({submitted: true});
        // axios.post('/AddUser', data)
        axios.post('/patients/add', data)
            .then(response => {
                console.log(response);
                this.setState({submitted: false});
                // console.log(response.data);
                // this.props.history.push('/Posts');
                // this.props.history.replace('/Posts');
            })
            .then(() => {
                this.setState({
                    firstName: '',
                    gender: 'Male',
                    email: '',
                    phoneNumber: '',
                    date_of_birth: '',
                    address: '',
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
                <h1>Add Patient <img src={close} onClick={this.props.clicked} alt='' /></h1>
                <Scrollbar>
                <form>

                    <div className={classes.picture}>
                    <label>Profile Picture</label>
                    <img src={process.env.PUBLIC_URL + "/assets/img/patient.png"} alt='' />
                    <button type='submit'>Select Image</button>
                    </div>

                    <label>Name</label>
                    <input type='text' name='name' value={this.state.firstName} onChange={(event) => this.setState({firstName: event.target.value})}/>

                    <label>Email Address</label>
                    <input type='text' name='email' value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} />

                    <label>Gender</label>
                    <select name='gender' value={this.state.gender} onChange={(event) => this.setState({gender: event.target.value})}>
                        <option disabled='disabled'>--Choose Option</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>

                    <label>Birth Date</label>
                    <input type='text' value={this.state.date_of_birth} onChange={(event) => this.setState({date_of_birth: event.target.value})} name='date_of_birth'></input>

                    <label>Address</label>
                    <input style={{width: '100%'}} type='text' value={this.state.address} onChange={(event) => this.setState({address: event.target.value})} name='address'></input>

                    <div className={classes.telephone}>
                    <label>Telephone</label>
                    <input style={{width: '100%'}} type='text' value={this.state.phoneNumber} onChange={(event) => this.setState({phoneNumber: event.target.value})} name='phone'></input>
                    </div>

                    <div className={classes.blood}>
                    <label>Blood Group</label>
                    <select name='blood_group' style={{width: '100%'}}>
                        <option disabled='disabled'>--Choose Option</option>
                        <option>A</option>
                        <option>B</option>
                        <option>AB</option>
                        <option>O</option>
                    </select>
                    </div>

                </form>
                <button className={classes.create} onClick={this.postDataHandler}>Create Profile</button>
                </Scrollbar>
            </div>
    );
    }
}

export default patientsforms;