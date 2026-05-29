// src/components/Navbar.js
import '../css/global.css';

export const renderNavbar = () => {
  return `
    <nav style="
      background: var(--bg-surface);
      padding: 16px 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: 0;
      z-index: 100;
    ">
      <!-- Identificador de la Carrera -->
      <div style="display: flex; gap: 12px; align-items: center; cursor: pointer;" onclick="window.location.hash='#/'">
        <div style="width: 40px; height: 40px; background: var(--ucb-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
          UCB
        </div>
        <span style="font-weight: 700; font-size: 18px; color: var(--ucb-primary); letter-spacing: -0.5px;">Software</span>
      </div>

      <!-- Enlaces Centrales -->
      <ul style="
        display: flex; 
        gap: 24px; 
        list-style: none;
        font-weight: 500;
        color: var(--text-muted);
      ">
        <li><a href="#/" style="text-decoration: none; color: inherit; transition: color 0.2s;" onmouseover="this.style.color='var(--ucb-primary)'" onmouseout="this.style.color='var(--text-muted)'">Inicio</a></li>
        <li><a href="#/materias" style="text-decoration: none; color: inherit; transition: color 0.2s;" onmouseover="this.style.color='var(--ucb-primary)'" onmouseout="this.style.color='var(--text-muted)'">Malla</a></li>
        <li><a href="#/eventos" style="text-decoration: none; color: inherit; transition: color 0.2s;" onmouseover="this.style.color='var(--ucb-primary)'" onmouseout="this.style.color='var(--text-muted)'">Eventos</a></li>
        <li><a href="#/docentes" style="text-decoration: none; color: inherit; transition: color 0.2s;" onmouseover="this.style.color='var(--ucb-primary)'" onmouseout="this.style.color='var(--text-muted)'">Docentes</a></li>
      </ul>
    </nav>
  `;
};