import {useEffect, useRef, useState} from "react";
import {getToken, verifyToken, decodeToken} from "../utils/loginFacade.js";
import {useLocation} from "react-router-dom";
import {Route, Routes} from "react-router-dom";
import {CONTEXT} from "../settings.js";
import Header from "./Header.jsx";
import Landing from "../pages/Landing.jsx";
import Search from "../pages/Search.jsx";
import Jokes from "../pages/Jokes.jsx";
import Contact from "../pages/Contact.jsx";
import Home from "../pages/Home.jsx";

export const initialState = {
    user: {
        name: undefined,
        roles: [],
        loggedIn: false,
    },
    expires: undefined,
};

export function mapToken(token, setSession) {
    const payload = decodeToken(token); //console.log(payload);
    const session = {
        user: {
            name: payload["sub"],
            roles: payload["roles"],
            loggedIn: true,
        },
        expires: new Date(payload["exp"] * 1000),
    };
    setSession(session);
    console.log(session);
}

export function scheduleCheck(token, setSession) {
    console.log("Scheduling check");
    const timeout = setTimeout(
        (token, setSession) => (checkToken)(token, setSession),
        new Date(decodeToken(token)["exp"] * 1000).getTime() - new Date().getTime() + 1,
        token, setSession,
    );
    return () => {
        console.log("Unscheduling check");
        clearTimeout(timeout);
    };
}

export async function checkToken(token, setSession) {
    console.log("Checking token");
    if ((token = await verifyToken())) {
        mapToken(token, setSession);
        return scheduleCheck(token, setSession);
    } else {
        console.log("Outdated token");
        setSession(initialState);
    }
}

export default () => {
    const [session, setSession] = useState(initialState);
    const [justLoggedIn, setJustLoggedIn] = useState(false);
    const timeout = useRef(undefined);
    const location = useLocation();

    useEffect(() => {
        let token; if ((token = getToken())) {
            if (timeout.current) {
                if (justLoggedIn) {
                    setJustLoggedIn(false);
                    return;
                }
                timeout.current();
            }
            if (justLoggedIn) {
                timeout.current = scheduleCheck(token, setSession);
            } else {
                (async () => timeout.current = await checkToken(token, setSession))();
            }
        }
    }, [location, justLoggedIn]);

    return (
        <>
            <Header session={session} setSession={setSession} setJustLoggedIn={setJustLoggedIn} />
            <Routes>
                {/* Pages you can always see */}
                <Route path={CONTEXT + "search"} element={<Search />} />
                <Route path={CONTEXT + "jokes"} element={<Jokes />} />
                <Route path="*" element={<h1>Page Not Found !!!!</h1>} />
                {!getToken() ?
                    <>
                        {/* Pages you can only see when you're logged OUT */}
                        <Route path={CONTEXT} element={<Landing session={session} />} />
                    </>
                    :
                    <>
                        {/* Pages you can only see when you're logged IN */}
                        <Route path={CONTEXT} element={<Home session={session} />} />

                        {session.user.roles.includes("admin") &&
                            <>
                                {/* Pages you can only see when you're ADMIN */}
                            </>
                        }
                    </>
                }
            </Routes>
        </>
    );
};
