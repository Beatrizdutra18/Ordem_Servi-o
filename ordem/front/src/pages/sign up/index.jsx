import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

export default function Signup() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("tecnico");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const cadastrar = async () => {
    if (!user || !password || !email || !phone) {
      alert("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/api/signup/", {
        username: user,
        password: password,
        email: email,
        phone: phone,
        role: role,
      });
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <FaUserPlus className="text-4xl text-gray-600 mb-4" />

      <input
        className="w-full max-w-md p-2 mb-3 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Username"
      />

      <input
        type="email"
        className="w-full max-w-md p-2 mb-3 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="tel"
        className="w-full max-w-md p-2 mb-3 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
      />

      <input
        type="password"
        className="w-full max-w-md p-2 mb-3 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <select
        className="w-full max-w-md p-2 mb-4 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="tecnico">Técnico</option>
        <option value="chefe">Chefe de Manutenção</option>
        <option value="admin">Administrador</option>
      </select>

      <button
        className={`w-full max-w-md p-2 ${loading ? "bg-pink-300" : "bg-pink-500"} text-white rounded-lg hover:bg-pink-600 transition`}
        onClick={cadastrar}
        disabled={loading}
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </div>
  );
}



