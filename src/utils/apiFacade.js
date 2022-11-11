import {getToken, isLoggedIn} from "./loginFacade.js";

export const makeOptions = (method, addToken, body) => {
    method = method ? method : 'GET';
    const opts = {
        method: method,
        headers: {
            ...(["PUT", "POST"].includes(method) && {
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
        return Promise.reject(response.json());
    }
    return response;
};

export default {
    makeOptions,
    handleHttpErrors,
};
