import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Patients from './Pages/Patients/Patients';
import Staff from './Pages/Staff/Staff';
import Pharmacy from './Pages/Pharmacy/Pharmacy';
import Signin from './Pages/Signin/Signin';
// import Spinner from './UI/Spinner/Spinner';

class App extends Component {

  // state = {
  //   loggedIn: false
  // }

  // loggedIn = () => {
  //   console.log('Logged');
  //   this.setState({loggedIn: true})
  // }

  // splashScreenHandler = () => {
  //   console.log('splashScreen');
  //   setTimeout(() => {
  //     return <Spinner />
  //   }, 5000);
  // }

  render () {

    return (
      <>
        {/* {this.state.loggedIn ? <div style={{height: '100vh', width: '100vw', position: 'fixed', zIndex: '10000', backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: '200px', left: '0'}}><Spinner /></div> : null} */}
          <Switch>
            <Route path="/" exact component={Signin} />
            {/* <Route path='/' exact component={Home} />
            <Route path='/patients' exact component={Products} />
            <Route path='/staff' exact component={Reports} />
            <Route path='/pharmacy' exact component={Pharmacy} /> */}
            
            <Route path="/patients" exact>
            <Navbar />
              <Patients />
            </Route>
            <Route path="/staff" exact>
            <Navbar />
              <Staff />
            </Route>
            <Route path="/pharmacy" exact>
            <Navbar />
              <Pharmacy />
            </Route>
            <Route exact path="/dashboard">
            <Navbar />
              <Dashboard />
            </Route>
            <Redirect to='/' />
          </Switch>
      </>
    );
}
}

export default App;
