import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

export default function Patrimonios() {
  const [patrimonios, setPatrimonios] = useState([]);
  const [formData, setFormData] = useState({ ni: "", desc: "", loca: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const buscar = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/patrimonios");
        setPatrimonios(response.data);
      } catch (error) {
        console.log(error);
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
      ? `http://127.0.0.1:8000/api/patrimonios/id/${editId}`
      : "http://127.0.0.1:8000/api/patrimonios";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (editId) {
          setPatrimonios((prev) =>
            prev.map((item) => (item.id === editId ? data : item))
          );
        } else {
          setPatrimonios((prev) => [...prev, data]);
        }
        setFormData({ ni: "", desc: "", loca: "" });
        setEditId(null);
      }
    } catch (err) {
      console.error("Erro ao salvar patrimônio:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData({ ni: item.ni, desc: item.desc, loca: item.loca });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/patrimonios/id/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPatrimonios((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Erro ao deletar patrimônio:", err);
    }
  };

  return (
    <main className="main-home">
      <div className="home-container">
        <h1 className="home-title">📦 Gestão de Patrimônios</h1>

        <ul className="ambiente-list">
          {patrimonios.map((item) => (
            <li key={item.id} className="card-item">
              <div className="card-content">
                <p><strong>NI:</strong> {item.ni}</p>
                <p><strong>Descrição:</strong> {item.desc}</p>
                <p><strong>Local:</strong> {item.loca}</p>
              </div>
              <div className="card-buttons">
                <button className="btn-edit" onClick={() => handleEdit(item)}>✏️ Editar</button>
                <button className="btn-delete" onClick={() => handleDelete(item.id)}>🗑️ Excluir</button>
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
            name="desc"
            placeholder="Descrição"
            value={formData.desc}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="loca"
            placeholder="Local"
            value={formData.loca}
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