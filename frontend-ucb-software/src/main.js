// src/main.js
import './css/global.css';
import { renderNavbar } from './components/Navbar.js';
import { renderSidebar } from './components/Sidebar.js';
import { renderHome } from './pages/Home.js';
import { renderMallaCurricular } from './pages/MallaCurricular.js';
import { renderDocentes } from './pages/Docentes.js';
import { renderEventos } from './pages/Eventos.js';
import { renderAlumni } from './pages/Alumni.js';
import { renderGaleria } from './pages/Galeria.js';
import { renderLogin } from './pages/Login.js';
import { renderAdminDashboard } from './pages/AdminDashboard.js';

const Vistas = {
  NotFound: () => `<div style="text-align: center; padding: 64px;"><h1>404</h1></div>`
};

const router = () => {
  const path = window.location.hash.slice(1).toLowerCase() || '/';
  const contentDiv = document.getElementById('router-view');
  
  // 1. GUARDIA DE SEGURIDAD (AUTH GUARD)
  if (path.startsWith('/admin')) {
    const token = localStorage.getItem('ucb_admin_token');
    if (!token) {
      // Si no hay token, lo pateamos de vuelta al login
      window.location.hash = '#/login';
      return;
    }
  }

  // 2. Ocultar el menú lateral de estudiantes en Login y Admin
  const sidebar = document.querySelector('aside');
  if (sidebar) {
    if (path === '/login' || path.startsWith('/admin')) {
      sidebar.style.display = 'none';
    } else {
      sidebar.style.display = 'block';
    }
  }

  contentDiv.innerHTML = '';

  switch (path) {
    case '/': renderHome(contentDiv); break;
    case '/materias': renderMallaCurricular(contentDiv); break;
    case '/docentes': renderDocentes(contentDiv); break;
    case '/alumni': renderAlumni(contentDiv); break;
    case '/galeria': renderGaleria(contentDiv); break;
    case '/eventos': renderEventos(contentDiv); break;
    case '/login': renderLogin(contentDiv); break;
    case '/admin': renderAdminDashboard(contentDiv); break; // <-- RUTA ADMIN
    default: contentDiv.innerHTML = Vistas.NotFound(); break;
  }
};

const initApp = () => {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderNavbar()}
    <div class="layout-container">
      ${renderSidebar()}
      <main class="main-content" id="router-view"></main>
    </div>
  `;
  window.addEventListener('hashchange', router);
  router();
};

document.addEventListener('DOMContentLoaded', initApp);