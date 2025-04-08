import React from "react";
import "./footer.css";


export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <h3>Escola SENAI Roberto Mange</h3>
                <p className="slogan">Formando profissionais para o futuro.</p>

                <p><strong>Endereço:</strong> Rua Pastor Cícero Canuto de Lima, 71 - Campinas, SP</p>
                <p><strong>Contato:</strong> (19) 3772-1840 | contato@senai.com.br</p>

                <div className="redes-sociais">
                    <span>Redes Sociais:</span>
                    <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>

                <p className="copy">
                    &copy; 2025 SENAI Roberto Mange. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}
