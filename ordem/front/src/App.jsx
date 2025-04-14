import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import "./index.css"; 
import Ambientes from "./pages/ambientes";
import Patrimonios from "./pages/patrimonios";

const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ambientes" element={<Ambientes />} />
            <Route path="/patrimonios" element={<Patrimonios />} />

            </Routes>
        </Router>
    )
}

export default App;