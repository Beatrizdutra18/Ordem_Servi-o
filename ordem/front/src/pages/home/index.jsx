import React from "react";
import "./styles.css";


export default function Home() {
    return (
        <main className="main-home">
            <div className="home-container">
                <h1 className="home-title">Bem-vindo ao Painel de Professores</h1>
                <p className="home-subtitle">Gerencie informações de forma rápida e eficiente.</p>

                <div className="home-buttons">
                    <button className="btn-home" onClick={() => window.location.href = "/professores"}>
                        Ver Professores
                    </button>
                    <button className="btn-home" onClick={() => window.location.href = "/cadastrar"}>
                        Cadastrar Novo
                    </button>
                    
                </div>
            </div>
        </main>
    );
}
