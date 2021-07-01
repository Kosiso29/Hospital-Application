import React from 'react';
import { Redirect } from 'react-router-dom';
import ReactCalendar from '../../Components/Calender/Calender';
import classes from './Dashboard.module.css';
import LoginName from "../../UI/LoginName/LoginName";

function Dashboard() {
    return(
        <>
            {localStorage.getItem("userId") ? null : <Redirect to='/error'/>}
            <div>
                <LoginName value={localStorage.getItem("firstName")} />
                <div className={classes.dashboard}>
                    <div className={classes.cardStat + ' ' + classes.mobileCalender}>
                        {/* <img src={process.env.PUBLIC_URL + "/assets/img/patient.png"} alt='' /> */}
                        <p>5th</p><h4>January</h4>
                        
                    </div>
                    <div className={classes.cardCalender}>
                        <ReactCalendar />
                    </div>
                    <div className={classes.cardStat}>
                        <img src={process.env.PUBLIC_URL + "/assets/img/patient.png"} alt='' />
                        <h4>45</h4><p>Patients</p>
                        
                    </div>
                    <div className={classes.cardStat}>
                        <img src={process.env.PUBLIC_URL + "/assets/img/doctor.png"} alt='' />
                        <h4>15</h4><p>Nurses</p>
                    </div>
                    <div className={classes.cardStat}>
                        <img src={process.env.PUBLIC_URL + "/assets/img/doctor.png"} alt='' />
                        <h4>15</h4><p>Doctors</p>
                    </div>
                    <div className={classes.cardStat}>
                        <img src={process.env.PUBLIC_URL + "/assets/img/visits.png"} alt='' />
                        <h4>17</h4><p>Average Visits</p>
                    </div>
                    <div className={classes.cardBottom}>
                        <h4>Appointments</h4><p></p>
                    </div>
                    <div className={classes.cardBottomRight}>
                        <h4>Recent Visits</h4><p></p>
                        {/* <ReactCalendar /> */}
                    </div>
                    {/* <div className={classes.cardStat}>
                        Calender
                    </div> */}
                    {/* <h1>Dashboard</h1> */}
                </div>
            </div>
        </>
    );
}

export default Dashboard;