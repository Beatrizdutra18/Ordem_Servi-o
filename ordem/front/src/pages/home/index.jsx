import React from "react";
import "./styles.css";

export function Home() {
    return (
        <main className="main-home">
            <div className="home-container">
                <h1 className="home-title">🎓 Painel de Professores</h1>
                <p className="home-subtitle">Gerencie tudo de forma rápida e eficiente.</p>

                <div className="home-buttons">
                    <button className="btn-home" onClick={() => window.location.href = "/patrimonios"}>
                        📦 Patrimônios
                    </button>
                    <button className="btn-home" onClick={() => window.location.href = "/ambientes"}>
                        🏫 Ambientes
                    </button>
                    <button className="btn-home" onClick={() => window.location.href = "/manutentores"}>
                        🔧 Manutentores
                    </button>
                    <button className="btn-home" onClick={() => window.location.href = "/gestores"}>
                        👔 Gestores
                    </button>
                </div>
            </div>
        </main>
    );
}
export default Home;