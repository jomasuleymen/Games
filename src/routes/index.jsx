import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import Register from "@pages/Register";
import Login from "@pages/Login";
import Games from "@pages/Games";
import Sudoku from "@app/sudoku";
import Puzzle from "@app/15puzzle";

function MainRoutes() {
    return (
        <div id="main">
            <Routes>
                <Route path="/" element={<Navigate to="/games" />} />
                <Route path="/register" element={<Register navigate={useNavigate()} />} />
                <Route path="/login" element={<Login navigate={useNavigate()} />} />
                <Route path="/games" element={<Games />} />
                <Route path="/sudoku" element={<Sudoku />} />
                <Route path="/15puzzle" element={<Puzzle />} />
            </Routes>
        </div>
    );
}

export default MainRoutes;
