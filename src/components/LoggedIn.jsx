import React, {useEffect, useState} from "react";
import facade from "../utils/apiFacade.js";

export default function LoggedIn({setLoggedIn}) {

    const logout = () => {
        facade.logout()
        setLoggedIn(false)
    }

    return (            
    
        <div className="login-container">
            <span>welcome {sessionStorage.getItem("username")}</span>
            <button onClick={logout}>Logout</button>
        </div>
    )

}
