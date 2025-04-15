import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Signup from "./pages/sign up";
import Ambientes from "./pages/ambientes";
import Patrimonios from "./pages/patrimonios";
import Manutentores from "./pages/manutentores";
import Gestores from "./pages/gestores"

const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign up" element={<Signup />} />
            <Route path="/ambientes" element={<Ambientes />} />
            <Route path="/patrimonios" element={<Patrimonios />} />
            <Route path="/manutentores" element={<Manutentores />} />
            <Route path="/gestores" element={<Gestores/>} />
            </Routes>
        </Router>
    )
}

export default App;