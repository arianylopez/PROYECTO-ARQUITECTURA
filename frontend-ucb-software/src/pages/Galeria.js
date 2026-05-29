// src/pages/Galeria.js
import '../css/galeria.css';
import { getAlbumsDirectory } from '../services/multimediaService.js';

export const renderGaleria = async (container) => {
  container.innerHTML = `
    <div class="loader-container">
      <div class="spinner"></div>
      <p>Cargando álbumes...</p>
    </div>
  `;

  try {
    const albums = await getAlbumsDirectory();

    const contentHtml = `
      <section class="galeria-container">
        <header class="galeria-header">
          <h1>GALERÍA INSTITUCIONAL</h1>
          <p>Explora nuestras instalaciones, proyectos y participación en eventos.</p>
        </header>

        <div class="galeria-grid">
          ${albums.length === 0 ? `
            <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">
              No hay álbumes publicados por el momento.
            </div>
          ` : albums.map(album => `
            <article class="album-card" data-id="${album.id}">
              <img src="${album.coverImageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}" 
                   alt="${album.title}" class="album-cover" loading="lazy">
              <div class="album-info">
                <h3>${album.title}</h3>
                <p><i class="ph ph-calendar"></i> ${new Date(album.createdAt).toLocaleDateString('es-ES')}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;

    container.innerHTML = contentHtml;

    // Agregar evento para abrir el álbum (Lógica que expandiremos luego)
    document.querySelectorAll('.album-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        console.log(`Abrir detalles del álbum: ${id}`);
        // Aquí conectaremos el DTO detallado de imágenes en el futuro
      });
    });

  } catch (error) {
    console.error("Error al cargar galería:", error);
    container.innerHTML = `
      <div style="padding: 24px; background: #FEE2E2; color: #991B1B; border-radius: 8px;">
        <h3>Error al cargar los recursos multimedia</h3>
        <p>Verifique la conexión con el servidor.</p>
      </div>
    `;
  }
};