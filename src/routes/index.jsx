import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Register from "@pages/Register";
import Login from "@pages/Login";
import Games from "@pages/Games";
import Sudoku from "@app/sudoku";

function MainRoutes() {
    return (
        <div id="main">
            <Routes>
                <Route path="/" element={<Navigate to="/games" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/games" element={<Games />} />
                <Route path="/sudoku" element={<Sudoku />} />
            </Routes>
        </div>
    );
}

export default MainRoutes;
