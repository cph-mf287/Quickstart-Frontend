import {LOGIN_URL, VERIFY_URL} from "../settings.js";
import {handleHttpErrors, makeOptions} from "./apiFacade.js";

export const setToken = (token) => {
    localStorage.setItem('jwtToken', token);
};

export const getToken = () => {
    return localStorage.getItem('jwtToken');
};

export const verifyToken = async () => {
    const options = makeOptions("GET", true);
    const response = await fetch(VERIFY_URL, options);
    return handleHttpErrors(response);
};

export const decodeToken = (token) => {
    if (!token) return undefined;
    const jwtData = token.split(".")[1];
    const decodedJwtJsonData = window.atob(jwtData);
    const decodedJwtData = JSON.parse(decodedJwtJsonData);
    decodedJwtData["roles"] = decodedJwtData["roles"].includes(",") ? decodedJwtData["roles"].split(",").toArray() : [decodedJwtData["roles"]];
    return decodedJwtData;
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
    return handleHttpErrors(response);
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
