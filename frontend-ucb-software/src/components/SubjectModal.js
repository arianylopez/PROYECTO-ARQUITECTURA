// src/components/SubjectModal.js
import '../css/modal.css';
import { getDetalleAsignatura } from '../services/academicoService.js';

export const openSubjectModal = async (code) => {
  // 1. Crear el overlay y agregarlo al body
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  
  // UX: Mostrar spinner mientras esperamos al backend
  overlay.innerHTML = `<div class="spinner"></div>`;
  document.body.appendChild(overlay);

  // 2. Función interna para cerrar el modal
  const closeModal = () => {
    overlay.remove();
  };

  try {
    // 3. Consumir el endpoint específico de tu backend
    const data = await getDetalleAsignatura(code);

    // 4. Adaptar los datos del backend a la estructura del Wireframe
    overlay.innerHTML = `
      <div class="modal-content">
        <button class="modal-close" id="close-modal-btn">
          <i class="ph ph-x"></i>
        </button>
        
        <div class="modal-header">
          <h2>${data.name}</h2>
        </div>

        <div class="modal-metrics">
          <div class="metric-card">
            <div class="metric-card-header">
              <i class="ph ph-book-bookmark"></i> Créditos
            </div>
            <strong>${data.credits}</strong>
          </div>
          <div class="metric-card">
            <div class="metric-card-header">
              <i class="ph ph-hash"></i> Código
            </div>
            <strong>${data.code}</strong>
          </div>
          <div class="metric-card">
            <div class="metric-card-header">
              <i class="ph ph-clock"></i> Semestre
            </div>
            <strong>${data.semesterNumber}</strong>
          </div>
        </div>

        <div class="modal-body-grid">
          <div class="modal-left">
            <div class="modal-section">
              <h3>Descripción</h3>
              <p>${data.description || 'La descripción de esta asignatura aún no ha sido cargada en el sistema académico.'}</p>
            </div>
            
            <div class="modal-section">
              <h3><i class="ph ph-books"></i> Bibliografía Base</h3>
              <p>${data.bibliography || 'Material de estudio proporcionado por el docente al inicio del semestre.'}</p>
            </div>
          </div>

          <div class="modal-right">
            <div class="modal-section">
              <h3><i class="ph ph-link"></i> Prerrequisitos</h3>
              <ul class="prereq-list">
                ${data.prerequisitesCodes.length > 0 
                  ? data.prerequisitesCodes.map(prereq => `<li>${prereq}</li>`).join('') 
                  : '<li>Ninguno (Materia de base)</li>'}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    // 5. Asignar eventos de cierre
    // Cerrar con la X
    overlay.querySelector('#close-modal-btn').addEventListener('click', closeModal);
    
    // Cerrar al hacer clic fuera del contenido (en el área oscura)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // Cerrar con la tecla Escape (Heurística de Control y Libertad del Usuario)
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    });

  } catch (error) {
    console.error(error);
    // Manejo de errores visual en el modal
    overlay.innerHTML = `
      <div class="modal-content" style="text-align: center; max-width: 400px;">
        <button class="modal-close" id="close-modal-btn"><i class="ph ph-x"></i></button>
        <i class="ph ph-warning-circle" style="font-size: 48px; color: #DC2626; margin-bottom: 16px;"></i>
        <h2 style="font-size: 20px;">Error al cargar datos</h2>
        <p style="color: var(--text-muted);">No pudimos obtener los detalles de ${code}. Intenta nuevamente.</p>
      </div>
    `;
    overlay.querySelector('#close-modal-btn').addEventListener('click', closeModal);
  }
};