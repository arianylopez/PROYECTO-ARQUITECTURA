// src/pages/AdminDashboard.js
import '../css/admin.css';
import { logoutUser } from '../services/authService.js';
import { getAllPosts, createPost } from '../services/contentService.js';

export const renderAdminDashboard = (container) => {
  // 1. Estructura HTML base del CMS
  container.innerHTML = `
    <div class="admin-shell">
      <aside class="admin-sidebar">
        <div class="admin-sidebar-header">Gestión de Contenidos</div>
        <nav class="admin-nav" id="admin-nav-menu">
          <a class="admin-nav-item active" data-target="panel-eventos">
            <i class="ph ph-calendar-star"></i> Eventos y Noticias
          </a>
          <a class="admin-nav-item" data-target="panel-home">
            <i class="ph ph-house"></i> Editar Inicio
          </a>
          </nav>
      </aside>

      <div class="admin-content">
        <div class="admin-topbar">
          <h1 id="admin-title">Eventos y Noticias</h1>
          <button class="admin-btn-logout" id="btn-logout">
            <i class="ph ph-sign-out"></i> Cerrar Sesión
          </button>
        </div>

        <div id="panel-eventos" class="admin-panel">
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 24px;">
            <h3>Directorio de Publicaciones</h3>
            <button class="btn-primary" id="btn-toggle-form"><i class="ph ph-plus"></i> Nuevo Registro</button>
          </div>

          <div class="admin-card" id="form-container" style="display: none; padding: 24px; margin-bottom: 32px; border-left: 4px solid var(--ucb-primary);">
            <h3 style="margin-bottom: 16px;">Crear Nueva Publicación</h3>
            <form id="form-create-post" style="display: grid; gap: 16px;">
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div>
                  <label style="display:block; margin-bottom: 8px; font-weight: 500;">Título</label>
                  <input type="text" id="post-title" class="form-control" required>
                </div>
                <div>
                  <label style="display:block; margin-bottom: 8px; font-weight: 500;">Tipo</label>
                  <select id="post-type" class="form-control" required>
                    <option value="EVENT">Evento</option>
                    <option value="NEWS">Noticia</option>
                  </select>
                </div>
              </div>

              <div>
                <label style="display:block; margin-bottom: 8px; font-weight: 500;">Contenido / Descripción</label>
                <textarea id="post-content" class="form-control" style="height: 100px;" required></textarea>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;" id="date-container">
                <div>
                  <label style="display:block; margin-bottom: 8px; font-weight: 500;">Fecha de Inicio</label>
                  <input type="datetime-local" id="post-start" class="form-control">
                </div>
                <div>
                  <label style="display:block; margin-bottom: 8px; font-weight: 500;">Fecha de Fin</label>
                  <input type="datetime-local" id="post-end" class="form-control">
                </div>
              </div>

              <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 8px;">
                <button type="button" class="btn-outline" id="btn-cancel-form">Cancelar</button>
                <button type="submit" class="btn-primary" id="btn-save-post">Guardar Publicación</button>
              </div>
            </form>
          </div>

          <div class="admin-card">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Título</th>
                  <th>Fecha Evento</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="table-body-posts">
                <tr><td colspan="5" style="text-align:center;">Cargando...</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="panel-home" class="admin-panel" style="display: none;">
          <h3>Próximamente...</h3>
        </div>

      </div>
    </div>
  `;

  // 2. Lógica Básica (Cerrar sesión y Menú)
  document.getElementById('btn-logout').addEventListener('click', logoutUser);
  configurarMenu();

  // 3. Lógica del CMS de Eventos
  configurarModuloEventos();
};

const configurarMenu = () => {
  const navItems = document.querySelectorAll('.admin-nav-item');
  const panels = document.querySelectorAll('.admin-panel');
  const adminTitle = document.getElementById('admin-title');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      navItems.forEach(nav => nav.classList.remove('active'));
      panels.forEach(panel => panel.style.display = 'none');
      e.currentTarget.classList.add('active');
      document.getElementById(e.currentTarget.dataset.target).style.display = 'block';
      adminTitle.textContent = e.currentTarget.textContent.trim();
    });
  });
};

const configurarModuloEventos = () => {
  const tableBody = document.getElementById('table-body-posts');
  const formContainer = document.getElementById('form-container');
  const form = document.getElementById('form-create-post');
  
  // Mostrar/Ocultar Formulario
  document.getElementById('btn-toggle-form').addEventListener('click', () => formContainer.style.display = 'block');
  document.getElementById('btn-cancel-form').addEventListener('click', () => {
    formContainer.style.display = 'none';
    form.reset();
  });

  // Mostrar/Ocultar fechas dependiendo del Tipo
  document.getElementById('post-type').addEventListener('change', (e) => {
    document.getElementById('date-container').style.display = e.target.value === 'EVENT' ? 'grid' : 'none';
  });

  // Función para cargar la tabla
  const cargarTabla = async () => {
    try {
      const posts = await getAllPosts();
      tableBody.innerHTML = posts.map(p => `
        <tr>
          <td><span style="background: #E2E8F0; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">${p.type}</span></td>
          <td>${p.title}</td>
          <td>${p.eventStartDate ? new Date(p.eventStartDate).toLocaleDateString() : 'N/A'}</td>
          <td><span style="color: ${p.isPublished ? '#15803D' : '#DC2626'}">●</span> ${p.isPublished ? 'Público' : 'Borrador'}</td>
          <td class="admin-actions-cell">
            <button class="btn-icon-delete" title="Borrar (Próximamente)"><i class="ph ph-trash"></i></button>
          </td>
        </tr>
      `).join('');
    } catch (error) {
      tableBody.innerHTML = `<tr><td colspan="5" style="color:red; text-align:center;">Error al cargar. Verifique su sesión.</td></tr>`;
    }
  };

  // Manejar el submit del formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btnSave = document.getElementById('btn-save-post');
    btnSave.disabled = true;
    btnSave.textContent = 'Guardando...';

    // Para la demo, asignamos al autor Admin que creamos en SQL
    const authorId = '77777777-7777-7777-7777-777777777771'; 
    // Y una categoría por defecto
    const categoryId = '55555555-5555-5555-5555-555555555551';

    const postData = {
      authorId: authorId,
      categoryId: categoryId,
      type: document.getElementById('post-type').value,
      title: document.getElementById('post-title').value,
      content: document.getElementById('post-content').value,
      eventStartDate: document.getElementById('post-start').value || null,
      eventEndDate: document.getElementById('post-end').value || null,
      isPublished: true
    };

    try {
      await createPost(postData);
      form.reset();
      formContainer.style.display = 'none';
      await cargarTabla(); // Recargamos la tabla
    } catch (error) {
      alert("Error al guardar el evento.");
    } finally {
      btnSave.disabled = false;
      btnSave.textContent = 'Guardar Publicación';
    }
  });

  // Carga inicial
  cargarTabla();
};