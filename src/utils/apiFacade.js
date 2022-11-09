import {BASE_URL} from "../settings.js";
import {getToken, isLoggedIn} from "./loginFacade.js";

export const makeOptions = (method, addToken, body) => {
    method = method ? method : 'GET';
    const opts = {
        method: method,
        headers: {
            ...(['PUT', 'POST'].includes(method) && {
                "Content-type": "application/json"
            }),
            "Accept": "application/json"
        },
    };
    if (addToken && isLoggedIn()) {
        opts.headers["x-access-token"] = getToken();
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
};

export const handleHttpErrors = async (response) => {
    if (!response.ok) {
        //console.log(await response.json());
        return Promise.reject({status: response.status, fullError: response.json()});
    }
    return response;
};

export const fetchData = () => {
    const options = makeOptions("GET", true);
    return fetch(BASE_URL + "/api/info/user", options).then(handleHttpErrors);
};

export default {
    makeOptions,
    handleHttpErrors,
    fetchData,
};
