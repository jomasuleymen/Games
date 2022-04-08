import React, { useEffect } from "react";
import { Provider } from "react-redux";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import userActions from "@actions/user-actions";
import userServices from "@services/userServices";

import NavBar from "@components/navbar";
import Sudoku from "@components/sudoku";
import Register from "@pages/Register";
import Login from "@pages/Login";
import Games from "@pages/Games";

import store from "@stores/stores";

import "@styles/bootstrap.min.css";
import "@styles/style.scss";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

function App() {
    useEffect(() => {
        async function setCurrentUserIfExists() {
            const user = await userServices.getCurrentUser();
            if (user) userActions.setUser(user);
        }

        setCurrentUserIfExists();
    }, []);

    return (
        <Router>
            <Provider store={store}>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Navigate to="/games" />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/sudoku" element={<Sudoku />} />
                </Routes>
                <ToastContainer />
            </Provider>
        </Router>
    );
}

export default App;
