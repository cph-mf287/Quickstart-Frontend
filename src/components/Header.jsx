import {NavLink} from "react-router-dom";
import {getToken} from "../utils/loginFacade.js";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css";

export default ({user, setUser, setErrorMessage}) => {
    return (
        <nav className="topnav">
            <NavLink end to="/"><i className="fa fa-fw fa-home"/> Home</NavLink>
            <NavLink to="/search"><i className="fa fa-fw fa-search"/> Search</NavLink>
            <NavLink to="/jokes"><i className="fa fa-fw fa-envelope"/> Jokes</NavLink>
            {user.roles.includes("admin") ? <NavLink to="/Tournament"><i className="fa fa-fw fa-envelope"/> Secret Admin Menu</NavLink> : null}
            {!getToken() ?
                <Login setUser={setUser} setErrorMessage={setErrorMessage}/> :
                <LoggedIn user={user} setUser={setUser}/>
            }
        </nav>
    );
};
