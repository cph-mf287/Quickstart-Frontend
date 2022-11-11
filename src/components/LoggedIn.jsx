import {removeToken} from "../utils/loginFacade.js";
import {initialState} from "./App.jsx";
import {Link} from "react-router-dom";
import {CONTEXT} from "../settings.js";

export default ({session, setSession}) => {
    const performLogOut = () => {
        removeToken();
        setSession(initialState);
    };

    return (
        <div className="login-container">
            {session.user.loggedIn &&
                /*        ↑↑↑↑↑↑↑↑
                 * The component would have rendered "Hi, !" (without a username) for a brief moment had we simply
                 * asked if the browser had stored a token, and then re-rendered the greeting with the username.
                 * Not a pretty solution! The username is first accessible when the token has been verified in the
                 * backend and then unpacked in the frontend, so we check whether it has been unpacked in the frontend
                 * before rendering any message to the user. (NB: The component will still render twice. It will just
                 * be completely blank at first – a more elegant solution than rendering an incomplete greeting)
                 */
                <span>
                    Hi, {session.user.name}! {session.user.roles.includes("admin") &&
                        // Renders an admin badge if the user has an admin role:
                        <span className="badge bg-dark">Admin</span>
                    }
                </span>
            }
            <Link to={CONTEXT} onClick={performLogOut}>Log Out</Link>
        </div>
    );
};
