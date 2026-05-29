// src/pages/Alumni.js
import '../css/alumni.css';
import { getAlumniDirectory } from '../services/communityService.js';

export const renderAlumni = async (container) => {
  container.innerHTML = `
    <div class="loader-container">
      <div class="spinner"></div>
      <p>Cargando red de graduados...</p>
    </div>
  `;

  try {
    const alumni = await getAlumniDirectory();

    const contentHtml = `
      <section class="alumni-container">
        <header class="alumni-header">
          <h1>RED DE GRADUADOS (ALUMNI)</h1>
          <p>Conoce a los profesionales formados en la UCB que hoy lideran la industria tecnológica.</p>
        </header>

        <div class="alumni-grid">
          ${alumni.length === 0 ? `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
              El directorio de graduados se está actualizando.
            </div>
          ` : alumni.map(graduado => `
            <article class="alumnus-card">
              
              <div class="alumnus-avatar">
                ${obtenerIniciales(graduado.fullName)}
              </div>
              
              <h3 class="alumnus-name">${graduado.fullName}</h3>
              <span class="alumnus-year">Clase del ${graduado.graduationYear}</span>
              
              <div class="alumnus-work">
                <i class="ph ph-briefcase"></i>
                <span>${graduado.currentCompany || 'Trabajador Independiente'}</span>
              </div>

              <div class="alumnus-actions">
                ${graduado.linkedinUrl 
                  ? `<a href="${graduado.linkedinUrl}" target="_blank" class="btn-linkedin-outline">
                       <i class="ph ph-linkedin-logo" style="font-size: 18px;"></i> Conectar en LinkedIn
                     </a>`
                  : `<button class="btn-linkedin-outline" style="border-color: var(--border-light); color: var(--text-muted); cursor: not-allowed;" disabled>
                       <i class="ph ph-linkedin-logo" style="font-size: 18px;"></i> Perfil privado
                     </button>`
                }
              </div>

            </article>
          `).join('')}
        </div>
      </section>
    `;

    container.innerHTML = contentHtml;

  } catch (error) {
    console.error("Error al cargar alumni:", error);
    container.innerHTML = `
      <div style="padding: 24px; background: #FEE2E2; color: #991B1B; border-radius: 8px;">
        <h3>Error al cargar la red de graduados</h3>
        <p>No se pudo establecer conexión con el servidor.</p>
      </div>
    `;
  }
};

// Utilidad para extraer iniciales
const obtenerIniciales = (nombreCompleto) => {
  if (!nombreCompleto) return "UX";
  const partes = nombreCompleto.trim().split(" ");
  if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
  return (partes[0][0] + partes[1][0]).toUpperCase();
};