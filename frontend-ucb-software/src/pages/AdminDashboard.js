import '../css/admin.css';
import { logoutUser } from '../services/authService.js';
import { getAllPosts, createPost, updatePost, deletePost } from '../services/contentService.js';
import { getMallaCurricular } from '../services/academicoService.js';

export const renderAdminDashboard = (container) => {
  container.innerHTML = `
    <div class="admin-shell">
      <aside class="admin-sidebar">
        <div class="admin-sidebar-header">Gestión de Contenidos</div>
        <nav class="admin-nav" id="admin-nav-menu">
          <a class="admin-nav-item active" data-target="panel-eventos">
            <i class="ph ph-calendar-star"></i> Eventos y Noticias
          </a>
          <a class="admin-nav-item" data-target="panel-materias">
            <i class="ph ph-books"></i> Malla Curricular
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
            <h3 id="form-title" style="margin-bottom: 16px;">Crear Nueva Publicación</h3>
            <form id="form-create-post" style="display: grid; gap: 16px;">
              <input type="hidden" id="post-id"> <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
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
                <label style="display:block; margin-bottom: 8px; font-weight: 500;">URL de Imagen de Portada</label>
                <input type="url" id="post-image" class="form-control" placeholder="https://ejemplo.com/imagen.jpg">
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
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="table-body-posts">
                <tr><td colspan="4" style="text-align:center;">Cargando...</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="panel-materias" class="admin-panel" style="display: none;">
          <h3>Gestor de Asignaturas (Se implementará en la próxima fase...)</h3>
        </div>

        <div id="panel-home" class="admin-panel" style="display: none;">
          <div class="admin-card" style="padding: 24px;">
            <h3 style="margin-bottom: 16px;">Texto Principal de la Plataforma</h3>
            <textarea id="home-hero-text-input" class="form-control" style="height: 100px; margin-bottom: 16px;"></textarea>
            <button class="btn-primary" id="btn-save-home">Guardar Cambios</button>
          </div>
        </div>

      </div>
    </div>
  `;

  document.getElementById('btn-logout').addEventListener('click', logoutUser);
  configurarMenu();
  configurarModuloInicio();
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

const configurarModuloInicio = () => {
  // Leemos si hay algo guardado localmente, si no, usamos el texto por defecto
  const savedText = localStorage.getItem('ucb_home_hero_text') || 'Desarrolla sistemas robustos, lidera proyectos tecnológicos y transforma el futuro digital con una sólida base científica, técnica y ética.';
  document.getElementById('home-hero-text-input').value = savedText;

  document.getElementById('btn-save-home').addEventListener('click', () => {
    const newText = document.getElementById('home-hero-text-input').value;
    localStorage.setItem('ucb_home_hero_text', newText);
    alert('¡El texto de Inicio ha sido actualizado! Ve a la página principal para ver los cambios.');
  });
};

const configurarModuloEventos = () => {
  const tableBody = document.getElementById('table-body-posts');
  const formContainer = document.getElementById('form-container');
  const form = document.getElementById('form-create-post');
  let currentPosts = []; // Guardamos los datos para poder rellenar el formulario al editar

  // Botón Nuevo
  document.getElementById('btn-toggle-form').addEventListener('click', () => {
    form.reset();
    document.getElementById('post-id').value = '';
    document.getElementById('form-title').textContent = 'Crear Nueva Publicación';
    formContainer.style.display = 'block';
  });

  document.getElementById('btn-cancel-form').addEventListener('click', () => {
    formContainer.style.display = 'none';
    form.reset();
  });

  const cargarTabla = async () => {
    try {
      currentPosts = await getAllPosts();
      tableBody.innerHTML = currentPosts.map(p => `
        <tr>
          <td><span style="background: #E2E8F0; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">${p.type}</span></td>
          <td>
            <strong>${p.title}</strong><br>
            <span style="font-size: 11px; color: gray;">${p.coverImageUrl ? '🖼️ Con imagen' : 'Sin imagen'}</span>
          </td>
          <td>${p.eventStartDate ? new Date(p.eventStartDate).toLocaleDateString() : 'N/A'}</td>
          <td class="admin-actions-cell">
            <button class="btn-icon-edit btn-edit-post" data-id="${p.id}" title="Editar"><i class="ph ph-pencil-simple"></i></button>
            <button class="btn-icon-delete btn-delete-post" data-id="${p.id}" title="Eliminar"><i class="ph ph-trash"></i></button>
          </td>
        </tr>
      `).join('');

      // Evento Eliminar
      document.querySelectorAll('.btn-delete-post').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = e.currentTarget.dataset.id;
          if(confirm('¿Seguro que deseas eliminar esto?')) {
            await deletePost(id);
            await cargarTabla();
          }
        });
      });

      // Evento Editar
      document.querySelectorAll('.btn-edit-post').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          const postToEdit = currentPosts.find(p => p.id === id);
          
          if (postToEdit) {
            document.getElementById('post-id').value = postToEdit.id;
            document.getElementById('post-title').value = postToEdit.title;
            document.getElementById('post-type').value = postToEdit.type;
            document.getElementById('post-content').value = postToEdit.content;
            document.getElementById('post-image').value = postToEdit.coverImageUrl || '';
            
            if (postToEdit.eventStartDate) {
              // Formatear para el input datetime-local
              document.getElementById('post-start').value = new Date(postToEdit.eventStartDate).toISOString().slice(0, 16);
            }
            
            document.getElementById('form-title').textContent = 'Editar Publicación';
            formContainer.style.display = 'block';
            window.scrollTo(0, 0); // Subir para ver el form
          }
        });
      });

    } catch (error) {
      tableBody.innerHTML = `<tr><td colspan="4" style="color:red; text-align:center;">Error al cargar datos.</td></tr>`;
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btnSave = document.getElementById('btn-save-post');
    btnSave.disabled = true;
    btnSave.textContent = 'Guardando...';

    const postId = document.getElementById('post-id').value;
    
    const postData = {
      authorId: '77777777-7777-7777-7777-777777777771', // Solo usado al crear
      categoryId: '55555555-5555-5555-5555-555555555551',
      type: document.getElementById('post-type').value,
      title: document.getElementById('post-title').value,
      content: document.getElementById('post-content').value,
      coverImageUrl: document.getElementById('post-image').value || null, // Guardamos la imagen
      eventStartDate: document.getElementById('post-start').value || null,
      eventEndDate: document.getElementById('post-end').value || null,
      isPublished: true
    };

    try {
      if (postId) {
        await updatePost(postId, postData); // Modo Edición
      } else {
        await createPost(postData); // Modo Creación
      }
      form.reset();
      formContainer.style.display = 'none';
      await cargarTabla();
    } catch (error) {
      alert("Error al guardar.");
    } finally {
      btnSave.disabled = false;
      btnSave.textContent = 'Guardar Publicación';
    }
  });

  cargarTabla();
};