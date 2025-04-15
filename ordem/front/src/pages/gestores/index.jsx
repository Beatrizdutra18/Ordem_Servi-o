import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

export default function Gestores() {
  const [gestores, setGestores] = useState([]);
  const [formData, setFormData] = useState({
    ni: "",
    nome: "",
    area: "",
    cargo: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const buscar = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/gestor");
        setGestores(response.data);
      } catch (error) {
        console.log("Erro ao buscar gestores:", error);
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
      ? `http://127.0.0.1:8000/api/gestor/id/${editId}`
      : "http://127.0.0.1:8000/api/gestor";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (editId) {
          setGestores((prev) =>
            prev.map((item) => (item.id === editId ? data : item))
          );
        } else {
          setGestores((prev) => [...prev, data]);
        }
        setFormData({ ni: "", nome: "", area: "", cargo: "" });
        setEditId(null);
      }
    } catch (err) {
      console.error("Erro ao salvar gestor:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      ni: item.ni,
      nome: item.nome,
      area: item.area,
      cargo: item.cargo,
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/gestor/id/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setGestores((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Erro ao deletar gestor:", err);
    }
  };

  return (
    <main className="main-home">
      <div className="home-container">
        <h1 className="home-title">👔 Gestores</h1>

        <ul className="ambiente-list">
          {gestores.map((item) => (
            <li key={item.id}>
              <strong>NI:</strong> {item.ni} |
              <strong> Nome:</strong> {item.nome} |
              <strong> Área:</strong> {item.area} |
              <strong> Cargo:</strong> {item.cargo}
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
            name="cargo"
            placeholder="Cargo"
            value={formData.cargo}
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
