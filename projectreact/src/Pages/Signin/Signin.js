import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import classes from './Signin.module.css';
import { connect } from "react-redux";
// import Spinner from '../../UI/Spinner/Spinner';
import Login from '../../UI/Login/Login';
import axios from '../../axios';
import * as actions from "../../store/actions";

class Signin extends Component {

    state = {
        email: '',
        password: '',
        userId: '',
        loggedIn: false,
        submitted: false,
        createPassword: false,
        verifiedEmail: '',
        error: false
      }

    
    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);
        let userId = '';
        if (query.entries()) {
            for (let param of query.entries()) {
                // ['salad', '1']
                if(param[0] === 'UserId') {
                    this.setState({createPassword: true});
                    this.props.onAuthVerifyEmail(param[1])
                    userId = param[1];
                    axios.get('http://102.164.38.38/HospitalApp/api/v1/VerifyEmail?UserId=' + userId)
                        .then(response => {
                            // console.log(response.data)
                            this.setState({verifiedEmail: response.data.email})
            });
                }            
            }
            // if (query.entries()[0] === 'userId') {
            //     userId = query.entries()[1];
            // }
            // setTimeout(() => {
            //     console.log('[Query after delay] ' + this.props.UserId);
            // }, 5000);
            // console.log('[Query before delay] ' + this.props.UserId);
            this.setState({userId: userId});
        } 
        if (this.state.loggedIn === false) {
            this.setState({
                email: 'test@test.com',
                password: '123456'
            })
        }

        
    }

    
    loggedIn = () => {
        const data = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        }
        this.setState({submitted: true});
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChQaYngkLZ57bg9r9fmIsyzOueM4ijUvc', data)
            .then(response => {
                // console.log(response.data)
                this.setState({submitted: false});
            })
            .then(() => {
                // console.log(response.data);
                this.setState({loggedIn: true});
            })
            .catch(error => {
                alert(error);
                this.setState({error: true, submitted: false});
            })
    
    }

    createPassword = () => {

        if (this.state.email === this.state.password && this.state.password !== '') {
            console.log('[verifiedEmail] ' + this.state.verifiedEmail);
            let email = {
                ...this.state
            }
            let data = {
                email: email.verifiedEmail,
                password: email.password
            }
            axios.post('http://102.164.38.38/HospitalApp/api/v1/CreatePassword', data)
                .then(response => {
                    console.log(response.data);
                    this.setState({createPassword: false, email: email.verifiedEmail, password: ''});
                    console.log(email);
                    this.props.history.replace('/');
                })
                .catch(error => {
                    alert(error);
                    this.props.history.replace('/');
                });
        } else {
            alert('Password does not match');
        }
    }

    onChangeHandler = (event, input) => {
        const userInput = event.target.value;
        input === 'email' ? this.setState({email: userInput}) : this.setState({password: userInput});
        //this.setState({email: userInput});
        // console.log(this.state.email + ' ' + this.state.password);
    }

    render(){
        if (this.state.loggedIn) {
            setTimeout(() => {
                // this.setState({loggedIn: false});
                // console.log(this.props)
                this.props.history.push('/dashboard');
                // return <Redirect to='/dashboard' />;
            }, 1000);
        }
        if (this.state.error) {
            setTimeout(() => {
                this.setState({error: false});
            }, 1000);
        }

        let rightPanel = (
            <div className={classes.rightPanel}>
                <div><img src={process.env.PUBLIC_URL + "/assets/img/logo.png"} width='73' alt='' /></div>
                <label>Sign In</label>
                <div className={classes.searchBoxSignin}>
                    <input key='email' onChange={(event) => this.onChangeHandler(event, 'email')} value={this.state.email} className={classes.searchTxtSignin} type='text' placeholder="Email" name="Email" />
                    {/* <Link className='search-btnSignin' to='#'></Link> */}
                </div>
                <div className={classes.searchBoxSignin}>
                    <input key='password' onChange={(event) => this.onChangeHandler(event, 'password')} value={this.state.password} className={classes.searchTxtSignin} type='password' placeholder="Password" name="Password" />
                    {/* <Link className='search-btnSignin' to='#'></Link> */}
                </div>
                <div className={classes.buttonSignin}>
                    <button type='submit' onClick={this.loggedIn} /*onClick={this.login}*/>Login</button>
                </div>
            </div>
        );

        if (this.state.createPassword) {
            let verifyPassword = null;
            if (this.state.email === this.state.password && this.state.password !== '') {
                verifyPassword = (
                    <p>Password matched *</p>
                );
            }
            rightPanel = (
                <div className={classes.rightPanel}>
                    <div><img src={process.env.PUBLIC_URL + "/assets/img/logo.png"} width='73' alt='' /></div>
                    <label>Create Password</label>
                    <div className={classes.searchBoxSignin}>
                        <input key='email' onChange={(event) => this.onChangeHandler(event, 'email')} value={this.state.email} className={classes.searchTxtSignin + ' ' + classes.searchSignin} type='password' placeholder="Enter Password" name="enter-password" />
                        {/* <Link className='search-btnSignin' to='#'></Link> */}
                    </div>
                    <div className={classes.searchBoxSignin}>
                        <input key='password' onChange={(event) => this.onChangeHandler(event, 'password')} value={this.state.password} className={classes.searchTxtSignin} type='password' placeholder="Confirm Password" name="Password" />
                        {/* <Link className='search-btnSignin' to='#'></Link> */}
                    </div>
                    {verifyPassword}
                    <div className={classes.buttonSignin}>
                        <button type='submit' onClick={this.createPassword} /*onClick={this.login}*/>Create Password</button>
                    </div>
                </div>
            );
        };

        return(
            <>
                {this.state.loggedIn ? <Login text="Login Successful" /> : null}
                {this.state.error ? <Login text="Login Failed" /> : null}
                {this.state.submitted ? <Login spinner='show' login='none' /> : null}
                {/* {this.state.submitted ? <Redirect push to='/dashboard' /> : null} */}
                <div className={classes.leftPanel}>
                    <img src={process.env.PUBLIC_URL + "/assets/img/logo.png"} width='73' alt='' />
                    <img src={process.env.PUBLIC_URL + "/assets/img/auroraname.png"} width='180' alt='' />
                    <h1>Welcome Back!</h1>
                    <p>Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus</p>
                    {/* <img src={process.env.PUBLIC_URL + "/assets/img/signin.png"} /> */}
                    <div></div>
                </div>
                {rightPanel}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        UserId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthVerifyEmail: (userId) => dispatch(actions.authVerifyEmail(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);