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

  render () {

    return (
      <>
          <Switch>
            <Route path="/" exact component={Signin} />
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
            <Route path="/error" exact render={() => <h6 style={{fontSize: "16px", margin: "10px 20px"}}>Error: Request failed with status code 403* <br></br>Forbidden Request*</h6>} />
            <Route path="/NotFound" exact render={() => <h6 style={{fontSize: "16px", margin: "10px 20px"}}>Error: Request failed with status code 404* <br></br>Page not Found*</h6>} />
            <Redirect to='/NotFound' />
          </Switch>
      </>
    );
}
}

export default App;
