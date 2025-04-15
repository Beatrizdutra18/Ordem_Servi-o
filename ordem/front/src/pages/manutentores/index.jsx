import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

export default function Manutentores() {
  const [manutentores, setManutentores] = useState([]);
  const [formData, setFormData] = useState({
    ni: "",
    nome: "",
    area: "",
    gestor: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const buscar = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/manutentores");
        setManutentores(response.data);
      } catch (error) {
        console.log("Erro ao buscar manutentores:", error);
      }
    };
    buscar();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://127.0.0.1:8000/api/manutentores/id/${editId}`
      : "http://127.0.0.1:8000/api/manutentores";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (editId) {
          setManutentores((prev) =>
            prev.map((item) => (item.id === editId ? data : item))
          );
        } else {
          setManutentores((prev) => [...prev, data]);
        }
        setFormData({ ni: "", nome: "", area: "", gestor: "" });
        setEditId(null);
      }
    } catch (err) {
      console.error("Erro ao salvar manutentor:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      ni: item.ni,
      nome: item.nome,
      area: item.area,
      gestor: item.gestor,
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/manutentores/id/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setManutentores((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Erro ao deletar manutentor:", err);
    }
  };

  return (
    <main className="main-home">
      <div className="home-container">
        <h1 className="home-title">🛠️ Manutentores</h1>

        <ul className="ambiente-list">
          {manutentores.map((item) => (
            <li key={item.id}>
              <strong>NI:</strong> {item.ni} |
              <strong> Nome:</strong> {item.nome} |
              <strong> Área:</strong> {item.area} |
              <strong> Gestor:</strong> {item.gestor}
              <div style={{ marginTop: "5px" }}>
                <button className="btn-edit" onClick={() => handleEdit(item)}>
                ✏️ Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(item.id)}>
                🗑️ Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>

        <form className="ambiente-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="ni"
            placeholder="NI"
            value={formData.ni}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="area"
            placeholder="Área"
            value={formData.area}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="gestor"
            placeholder="Gestor"
            value={formData.gestor}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-home">
            {editId ? "🔄 Atualizar" : "➕ Cadastrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
