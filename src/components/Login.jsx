import {useState} from "react";
import {logIn} from "../utils/loginFacade.js";
import {mapToken} from "./App.jsx";

export const initialState = {
    username: "",
    password: "",
};

export default ({setSession, setJustLoggedIn, setErrorMessage}) => {
    const [loginCredentials, setLoginCredentials] = useState(initialState);

    const handleChange = (event) => setLoginCredentials({...loginCredentials, [event.target.id]: event.target.value});

    const performLogIn = async (event) => {
        event.preventDefault();
        let token; if ((token = await logIn(loginCredentials.username, loginCredentials.password))) {
            mapToken(token, setSession);
            setJustLoggedIn(true);
        }
    };

    return (
        <div className="login-container">
            <form>
                <input onChange={handleChange} type="text" placeholder="Username" id="username" />{" "}
                <input onChange={handleChange} type="password" placeholder="Password" id="password" />
                <button onClick={performLogIn} type="submit">Log In</button>
            </form>
        </div>
    );
};
