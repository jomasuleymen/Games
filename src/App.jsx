import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import userServices from "@services/userServices";

import { ToastContainer } from "react-toastify";
import NavBar from "@components/navbar";
import MainRoutes from "./routes";
import store from "@store/store";

function App() {
    useEffect(() => {
        userServices.setCurrentUser();
    }, []);

    return (
        <>
            <ToastContainer />
            <Provider store={store}>
                <BrowserRouter>
                    <NavBar />
                    <MainRoutes />
                </BrowserRouter>
            </Provider>
        </>
    );
}

export default App;
