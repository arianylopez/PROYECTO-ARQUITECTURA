// src/pages/Docentes.js
import '../css/docentes.css';
import { getDocentesDirectory } from '../services/communityService.js';

export const renderDocentes = async (container) => {
  container.innerHTML = `
    <div class="loader-container">
      <div class="spinner"></div>
      <p>Cargando directorio de docentes...</p>
    </div>
  `;

  try {
    const docentes = await getDocentesDirectory();

    const contentHtml = `
      <section class="docentes-container">
        <header class="docentes-header">
          <h1>PLANTEL DOCENTE</h1>
          <p>Profesionales destacados de la industria guiando tu formación.</p>
        </header>

        <div class="docentes-grid">
          ${docentes.map(docente => `
            <article class="docente-card">
              
              <div class="docente-top">
                ${docente.photoUrl 
                  ? `<img src="${docente.photoUrl}" alt="${docente.fullName}" class="docente-avatar" />`
                  : `<div class="docente-avatar">${obtenerIniciales(docente.fullName)}</div>`
                }
                <h3>${docente.fullName}</h3>
                <p>${docente.specialty}</p>
              </div>

              <div class="docente-bottom">
                
                <div class="docente-section-title">
                  <i class="ph ph-book-open"></i> Materias que imparte
                </div>
                
                <div class="docente-materias">
                  ${docente.subjectsTaught.length > 0 
                    ? docente.subjectsTaught.map(materia => `<span class="materia-tag">${materia}</span>`).join('')
                    : `<span class="materia-tag">Asignaciones pendientes</span>`
                  }
                </div>

                <div class="docente-actions">
                  ${docente.linkedinUrl 
                    ? `<a href="${docente.linkedinUrl}" target="_blank" class="btn-linkedin">
                         <i class="ph ph-linkedin-logo" style="font-size: 18px;"></i> LinkedIn
                       </a>`
                    : `<button class="btn-linkedin" style="background: var(--text-muted); cursor: not-allowed;" disabled>
                         <i class="ph ph-linkedin-logo" style="font-size: 18px;"></i> No disponible
                       </button>`
                  }
                  <button class="btn-icon" title="Ver perfil completo">
                    <i class="ph ph-envelope-simple"></i>
                  </button>
                </div>

              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;

    container.innerHTML = contentHtml;

  } catch (error) {
    console.error("Error al cargar docentes:", error);
    container.innerHTML = `
      <div style="padding: 24px; background: #FEE2E2; color: #991B1B; border-radius: 8px;">
        <h3>Error al cargar el directorio</h3>
        <p>No se pudo establecer conexión con la base de datos de docentes.</p>
      </div>
    `;
  }
};

// Utilidad para extraer las iniciales (Ej: "Carlos Villagómez" -> "CV")
const obtenerIniciales = (nombreCompleto) => {
  if (!nombreCompleto) return "UCB";
  const partes = nombreCompleto.trim().split(" ");
  if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
  return (partes[0][0] + partes[1][0]).toUpperCase();
};