import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import userServices from "@services/userServices";

import "./navbar.scss";

function NavBar() {

    const user = useSelector(store => store.user);
    return (
        <nav className="navbar">
            <Link to="/games" className="item logo">
                Games
            </Link>
            
            { !user && <div className="auth">
                <Link to="/register" className="item signUp">
                    Sign Up
                </Link>
                <Link to="/login" className="item signIn">
                    Log In
                </Link>
            </div> }
            {
                user && <div className="user" onClick={userServices.logout}>Log out</div>
            }
        </nav>
    );
}

export default NavBar;
