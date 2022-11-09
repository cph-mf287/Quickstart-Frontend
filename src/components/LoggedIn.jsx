import {removeToken} from "../utils/loginFacade.js";
import {initialState} from "./App.jsx";

export default ({user, setUser}) => {
    const performLogOut = () => {
        removeToken();
        setUser(initialState);
    };

    return (
        <div className="login-container">
            {user.isLoggedIn &&
                /* ↑↑↑↑↑↑↑↑↑
                 * If we didn't put this condition, the component would render "Hi, !" for a brief moment until
                 * the token has been verified, and then re-render the greeting with the username when the user
                 * has been set... Not a pretty solution! Instead, we put this the condition which relies on the
                 * user being set after the token verification, and only after that process will the full greeting
                 * be rendered. (NB: The component will still render twice, but just be completely blank at first
                 * – a more elegant solution than rendering an incomplete greeting)
                 */
                <span>
                    Hi, {user["username"]}! {user["roles"].includes("admin") &&
                        // Renders an admin badge if the user has an admin role:
                        <span className="badge bg-dark">Admin</span>
                    }
                </span>
            }
            <button onClick={performLogOut}>Log Out</button>
        </div>
    );
};
