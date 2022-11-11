import {LOGIN_URL, VERIFY_URL} from "../settings.js";
import {handleHttpErrors, makeOptions} from "./apiFacade.js";

export const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
};

export const getToken = () => {
    return localStorage.getItem("jwtToken");
};

export const verifyToken = async () => {
    const options = makeOptions("GET", true);
    const response = await fetch(VERIFY_URL, options);
    try {
        const token = await (await handleHttpErrors(response)).json();
        setToken(token);
        console.log(token);
        return token;
    } catch (error) {
        removeToken();
        console.log((await error).message);
        //alert("Your session has expired. Please log in again.");
        return false;
    }
};

export const decodeToken = (token) => {
    if (!token) return undefined;
    const encodedPayload = token.split(".")[1];
    const decodedPayload = window.atob(encodedPayload);
    const payload = JSON.parse(decodedPayload);
    payload["roles"] = payload["roles"].includes(",") ? payload["roles"].split(",").toArray() : [payload["roles"]];
    return payload;
};

export const removeToken = () => {
    localStorage.removeItem("jwtToken");
};

export const isLoggedIn = () => {
    return getToken() != null;
};

export const logIn = async (user, password) => {
    const options = makeOptions("POST", false, {username: user, password: password});
    const response = await fetch(LOGIN_URL, options);
    try {
        const token = await (await handleHttpErrors(response)).json();
        setToken(token);
        console.log(token);
        return token;
    } catch (error) {
        console.log((await error).message);
        return false;
    }
};

export default {
    setToken,
    getToken,
    verifyToken,
    decodeToken,
    removeToken,
    isLoggedIn,
    logIn,
};
