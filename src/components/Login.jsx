import {useState} from "react";
import {logIn, removeToken, setToken} from "../utils/loginFacade.js";
import {mapUser} from "./App.jsx";

export const initialState = {
    username: "",
    password: "",
};

export default ({setUser, setErrorMessage}) => {
    const [loginCredentials, setLoginCredentials] = useState(initialState);

    const onChange = (evt) => {
        setLoginCredentials({...loginCredentials, [evt.target.id]: evt.target.value});
    };

    const performLogIn = async (evt) => {
        evt.preventDefault();
        try {
            const token = await (await logIn(loginCredentials.username, loginCredentials.password)).json();
            setToken(token);
            console.log(token);
            mapUser(token, setUser);
        } catch (e) {
            removeToken();
            console.log((await e.fullError).message);
        }
    };

    return (
        <div className="login-container">
            <form>
                <input onChange={onChange} type="text" placeholder="Username" id="username"/>{" "}
                <input onChange={onChange} type="password" placeholder="Password" id="password"/>
                <button onClick={performLogIn} type="submit">Log In</button>
            </form>
        </div>
    );
};
