import React from "react";
import "./styles.css";


export default function Home() {
    return (
        <main className="main-home">
            <div className="home-container">
                <h1 className="home-title">Bem-vindo ao Painel de Professores</h1>
                <p className="home-subtitle">Gerencie informações de forma rápida e eficiente.</p>

                <div className="home-buttons">
                <button className="btn-home" onClick={() => window.location.href = "/cadastrar"}>
                        Patrimonios
                    </button>
                    <button className="btn-home" onClick={() => window.location.href = "/ambientes"}>
                        ambientes
                    </button>
                    <button className="btn-home" onClick={() => window.location.href = "/cadastrar"}>
                        Manutentores
                    </button>
                    <button className="btn-home" onClick={() => window.location.href = "/cadastrar"}>
                        Gestores
                    </button>
                    
                </div>
            </div>
        </main>
    );
}
