import React, { useEffect, useState } from 'react';
import './styles.css';

export default function Ambientes() {
  const [ambientes, setAmbientes] = useState([]);
  const [formData, setFormData] = useState({ ni: '', nome: '', resp: '' });
  const [editId, setEditId] = useState(null); // novo estado para edição

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/ambientes')
      .then(res => res.json())
      .then(data => setAmbientes(data))
      .catch(err => console.error('Erro ao buscar ambientes:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId
      ? `http://127.0.0.1:8000/api/ambientes/id/${editId}`
      : 'http://127.0.0.1:8000/api/ambientes';

    const method = editId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    console.log(JSON.stringify(formData))

      if (response.ok) {
        const updatedItem = await response.json();

        if (editId) {
          // update local
          setAmbientes(prev =>
            prev.map(item => (item.id === editId ? updatedItem : item))
          );
        } else {
          // add novo
          setAmbientes(prev => [...prev, updatedItem]);
        }

        setFormData({ ni: '', nome: '', resp: '' });
        setEditId(null);
      }
    } catch (err) {
      console.error('Erro ao enviar ambiente:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/ambientes/id/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAmbientes(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error('Erro ao deletar ambiente:', err);
    }
  };

  const handleEdit = (amb) => {
    setFormData({ ni: amb.ni, nome: amb.nome, resp: amb.resp });
    setEditId(amb.id);
  };

  return (
    <main className="main-home">
      <div className="home-container">
        <h1 className="home-title">🏫 Ambientes</h1>

        <ul className="ambiente-list">
          {ambientes.map((amb) => (
            <li key={amb.id}>
              <strong>NI:</strong> {amb.ni} | <strong>Nome:</strong> {amb.nome} | <strong>Resp:</strong> {amb.resp}
              <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <button onClick={() => handleEdit(amb)} className="btn-edit">✏️ Editar</button>
                <button onClick={() => handleDelete(amb.id)} className="btn-delete">🗑️ Deletar</button>
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
            name="resp"
            placeholder="Responsável"
            value={formData.resp}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-home">
            {editId ? '🔄 Atualizar' : '➕ Cadastrar'}
          </button>
        </form>
      </div>
    </main>
  );
}
