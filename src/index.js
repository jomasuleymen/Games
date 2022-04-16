import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "@styles/bootstrap.min.css";
import "@styles/style.scss";
import "react-toastify/dist/ReactToastify.css";

import store from "@store/store";

import { ToastContainer } from "react-toastify";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <ToastContainer />
        <App />
    </Provider>
);
