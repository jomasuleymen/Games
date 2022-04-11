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
        const setCurrentUserIfExists = (async () => {
            const user = await userServices.setCurrentUser();
        });

        setCurrentUserIfExists();
    }, []);

    return (
        <React.Fragment>
            <ToastContainer />
            <BrowserRouter>
                <Provider store={store}>
                    <NavBar />
                    <MainRoutes />
                </Provider>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
