import "../styles/header.css";

import {NavLink} from "react-router-dom";
import {CONTEXT} from "../settings.js";
import {getToken} from "../utils/loginFacade.js";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";

export default ({session, setSession, setJustLoggedIn, setErrorMessage}) => {
    return (
        <nav className="topnav">
            {/* Links you can always see */}
            <NavLink end to={CONTEXT}><i className="fa fa-fw fa-home" /> Home</NavLink>
            <NavLink to={CONTEXT + "search"}><i className="fa fa-fw fa-search" /> Search</NavLink>
            <NavLink to={CONTEXT + "jokes"}><i className="fa fa-fw fa-envelope" /> Jokes</NavLink>
            {!getToken() ?
                <>
                    {/* Links you can only see when you're logged OUT */}
                    <Login setSession={setSession} setJustLoggedIn={setJustLoggedIn} setErrorMessage={setErrorMessage} />
                </> :
                <>
                    {/* Links you can only see when you're logged IN */}
                    {session.user.roles.includes("admin") ? <NavLink to={CONTEXT + "Tournament"}><i className="fa fa-fw fa-envelope" /> Secret Admin Menu</NavLink> : null}
                    <LoggedIn session={session} setSession={setSession} />
                </>
            }
        </nav>
    );
};
