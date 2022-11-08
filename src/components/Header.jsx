import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css";


function Header({setErrorMsg, loggedIn, setLoggedIn}) {


    return (
        <nav className="topnav">
            <NavLink className="active" to="/"><i className="fa fa-fw fa-home"></i> Home</NavLink>
            <NavLink to="/search"><i className="fa fa-fw fa-search"></i> Search</NavLink>
            <NavLink to="/jokes"><i className="fa fa-fw fa-envelope"></i> Jokes</NavLink>
            {/*admin ? (<NavLink to="/Tournament"><i className="fa fa-fw fa-encelope"></i> Tournament</NavLink>) : null*/}
            {!loggedIn ?
                (<Login setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg}  />) :
                (<LoggedIn setLoggedIn={setLoggedIn}/>)}
        </nav>

    );
}

export default Header;
