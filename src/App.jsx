import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import userServices from "@services/userServices";

import NavBar from "@components/navbar";
import MainRoutes from "./routes";

function App() {
    const user = useSelector((state) => state.user);
    useEffect(() => {
        userServices.setCurrentUser();
    }, []);

    return (
        <BrowserRouter>
            <NavBar user={user} />
            <MainRoutes />
        </BrowserRouter>
    );
}

export default App;
