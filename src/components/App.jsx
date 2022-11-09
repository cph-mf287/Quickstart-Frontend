import {useEffect, useState} from "react";
import {getToken, verifyToken, decodeToken, removeToken, setToken} from "../utils/loginFacade.js"
import {Route, Routes} from "react-router-dom";
import Header from "./Header.jsx";
import LandingPage from "../pages/Landing.jsx";
import Home from "../pages/Home.jsx";
import Search from "../pages/Search.jsx";
import Contact from "../pages/Contact.jsx";
import Jokes from "../pages/Jokes.jsx";

export const initialState = {
    username: null,
    roles: [],
    isLoggedIn: false,
    loggingOut: null,
};

export async function checkToken(token, setUser) {
    try {
        token = await (await verifyToken(token)).json();
        console.log(token);
        setToken(token);
        mapUser(token, setUser);
        return token;
    } catch (e) {
        removeToken();
        console.log((await e.fullError).message);
        alert("Your session has expired. Please log in again.");
        setUser(initialState);
        return false;
    }
}

export function mapUser(token, setUser) {
    const info = decodeToken(token);
    //console.log(info);
    setUser({
        username: info["sub"],
        roles: info["roles"],
        isLoggedIn: true,
        loggingOut: new Date(info["exp"] * 1000),
    });
    setTimeout(
        (token) => checkToken(token, setUser),
        new Date(decodeToken(token)["exp"] * 1000).getTime() - new Date().getTime() + 1000,
        token,
    );
}

export default () => {
    const [user, setUser] = useState(initialState);

    useEffect(() => {
        let token;
        if ((token = getToken()))
            ((token) => checkToken(token))(token);
    }, []);

    const obj = {
        name: "TestName",
        street: "TestStreet",
        town: "TestTown",
        country: "TestCountry",
    };

    return (
        <>
            <Header user={user} setUser={setUser} />
            <Routes>
                {!getToken() ?
                    <>
                        {/* Pages where you have to be logged OUT */}
                        <Route path="/" element={<LandingPage user={user}/>}/>
                    </>
                    :
                    <>
                        {/* Pages where you have to be logged IN */}
                        <Route path="/" element={<Home user={user}/>}/>

                        {user.roles.includes("admin") &&
                            <>
                                {/* Pages where you have to be ADMIN */}
                            </>
                        }
                    </>
                }
                {/* Pages you can always see */}
                <Route path="/search" element={<Search/>}/>
                <Route path="/contact" element={<Contact address={obj}/>}/>
                <Route path="/jokes" element={<Jokes/>}/>
                <Route path="*" element={<h1>Page Not Found !!!!</h1>}/>
            </Routes>
        </>
    );
};
