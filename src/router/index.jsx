import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "../pages/Home";
import Profile from "../pages/Profile";

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;