import React from "react";
import { createRoot } from 'react-dom/client';

import "@styles/bootstrap.min.css";
import "@styles/style.scss";
import "react-toastify/dist/ReactToastify.css";

import App from './App';

const root = createRoot(document.getElementById('root'));
root.render( <App /> );
