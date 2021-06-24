import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import close from "../../assets/images/burger.png";
import Backdrop from '../../UI/Backdrop/Backdrop';

class Navbar extends Component {

    state = {
        bgColor1 : "clicked",
        bgColor2 : "",
        bgColor3 : "",
        bgColor4 : "",
        sidebar: true
    };

    showSidebar1 = () => this.setState({
        bgColor1 : "clicked",
        bgColor2 : "",
        bgColor3 : "",
        bgColor4 : ""
    });
    showSidebar2 = () => this.setState({
        bgColor1 : "",
        bgColor2 : "clicked",
        bgColor3 : "",
        bgColor4 : ""
    });
    showSidebar3 = () => this.setState({
        bgColor1 : "",
        bgColor2 : "",
        bgColor3 : "clicked",
        bgColor4 : ""
    });
    showSidebar4 = () => this.setState({
        bgColor1 : "",
        bgColor2 : "",
        bgColor3 : "",
        bgColor4 : "clicked"
    });

    closeNav = () => {
        this.setState({sidebar: !this.state.sidebar});
    }

    render() {

        if (window.location.pathname === "/patients" && this.state.bgColor2 !== "clicked") {
            this.setState({bgColor1 : "", bgColor2 : "clicked", bgColor3 : "", bgColor4 : "" });
        }
        if (window.location.pathname === "/staff" && this.state.bgColor3 !== "clicked") {
            this.setState({bgColor1 : "", bgColor2 : "", bgColor3 : "clicked", bgColor4 : "" });
        }
        if (window.location.pathname === "/pharmacy" && this.state.bgColor4 !== "clicked") {
            this.setState({bgColor1 : "", bgColor2 : "", bgColor3 : "", bgColor4 : "clicked" });
        }
    return (
        <>
            {/* {window.location.pathname === "/patients" ? sidebar.bgColor2='clicked' : null} */}
            {/*<IconContext.Provider value={{color: '#fff'}}>
                {/* <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar}/>
                    </Link>
                </div> */}
                {this.state.sidebar ? null : <Backdrop index='5' clicked={this.closeNav} show />}
                <nav /*className='nav-menu active'*/ className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
                    {/* <div className="burger"> */}
                        <img src={close} className="burger" onClick={this.closeNav} alt='' width='30' />
                    <ul className="nav-menu-items">
                        {/* <li className='nav-text' style={{backgroundColor: 'white'}}>
                            <img src={close} onClick={this.closeNav} alt='' /></li> */}
                        <li /*className='navbar-toggle' onClick={showSidebar}*/ className='auroraname'>
                            <img src={process.env.PUBLIC_URL + "/assets/img/auroraname.png"} onClick={this.closeNav} alt='' />
                            {/* <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link> */}
                        </li>
                        <li className='nav-text'>
                            <Link to='/dashboard' className={this.state.bgColor1} onClick={this.showSidebar1}>
                                {/* {item.icon} */}
                                <img src={process.env.PUBLIC_URL + "/assets/img/dashboard.png"} width='25' alt='' />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className='nav-text'>
                            <Link to='/patients' className={this.state.bgColor2} onClick={this.showSidebar2}>
                                {/* {item.icon} */}
                                <img src={process.env.PUBLIC_URL + "/assets/img/patient1.png"} width='25' alt='' />
                                <span>Patients</span>
                            </Link>
                        </li>
                        <li className='nav-text'>
                            <Link to='/staff' className={this.state.bgColor3} onClick={this.showSidebar3}>
                                {/* {item.icon} */}
                                <img src={process.env.PUBLIC_URL + "/assets/img/staff.png"} width='25' alt='' />
                                <span>Staff</span>
                            </Link>
                        </li>
                        <li className='nav-text'>
                            <Link to='/pharmacy' className={this.state.bgColor4} onClick={this.showSidebar4}>
                                {/* {item.icon} */}
                                <img src={process.env.PUBLIC_URL + "/assets/img/pharmacy.png"} width='25' alt='' />
                                <span>Pharmarcy</span>
                            </Link>
                        </li>
                        <br></br>
                        <li className='nav-text'>
                            <Link to='/projectreact' onClick={this.showSidebar4}>
                                {/* {item.icon} */}
                                <img src={process.env.PUBLIC_URL + "/assets/img/logout.png"} width='25' alt='' />
                                <span>Log Out</span>
                            </Link>
                        </li>
                        {/* {SidebarData.map((item, index) => {
                            return (
                                <li id={index} key={index} className={item.cName} onClick={reply_click(index)}>
                                    <Link to={item.path}>
                                        {/* {item.icon} */}
                                       {/*</ul> <img src={Ellipse1} />
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })} */}
                    </ul>
                </nav>
            {/*</IconContext.Provider>*/}
        </>
    );
    }
}

export default Navbar;