// src/pages/Eventos.js
import '../css/eventos.css';
import { getUpcomingEvents } from '../services/contentService.js';

export const renderEventos = async (container) => {
  container.innerHTML = `
    <div class="loader-container">
      <div class="spinner"></div>
      <p>Buscando próximos eventos...</p>
    </div>
  `;

  try {
    const eventos = await getUpcomingEvents();

    const contentHtml = `
      <section class="eventos-container">
        <header class="eventos-header">
          <h1><i class="ph ph-calendar-blank"></i> EVENTOS Y ACTIVIDADES</h1>
          <p>Participa en conferencias, workshops y meetups para ampliar tus conocimientos</p>
        </header>

        <div class="event-list">
          ${eventos.length === 0 ? `
            <div style="text-align:center; color: var(--text-muted); padding: 40px;">
              No hay eventos próximos programados por el momento.
            </div>
          ` : eventos.map(evento => `
            <article class="event-card">
              
              <div class="event-image-container">
                <img src="${evento.coverImageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}" 
                     class="event-image" alt="${evento.title}">
                
                <span class="event-badge">${determinarTipoEvento(evento.title)}</span>
                
                <div class="event-image-text">
                  <h3>Ing. de Software</h3>
                  <p>Campus UCB Santa Cruz</p>
                </div>
              </div>

              <div class="event-content">
                <h2>${evento.title}</h2>
                
                <div class="event-meta">
                  <div class="meta-item">
                    <i class="ph ph-calendar"></i>
                    ${formatearFecha(evento.eventStartDate)}
                  </div>
                  <div class="meta-item">
                    <i class="ph ph-clock"></i>
                    ${formatearHora(evento.eventStartDate)}
                  </div>
                  <div class="meta-item">
                    <i class="ph ph-map-pin"></i>
                    ${evento.location || 'Auditorio Principal'}
                  </div>
                </div>

                <p class="event-desc">${evento.content}</p>

                <div class="event-actions">
                  <button class="btn-outline">Ver detalles ▾</button>
                  <button class="btn-primary" onclick="window.open('${evento.externalRegistrationUrl || '#'}', '_blank')">
                    Inscribirse <i class="ph ph-arrow-square-out"></i>
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
    console.error("Error al cargar eventos:", error);
    container.innerHTML = `
      <div style="padding: 24px; background: #FEE2E2; color: #991B1B; border-radius: 8px; text-align: center;">
        <h3>No se pudieron cargar los eventos</h3>
        <p>Por favor intenta nuevamente más tarde.</p>
      </div>
    `;
  }
};

// --- Utilidades para el formato de visualización ---

const formatearFecha = (isoDate) => {
  if (!isoDate) return 'Fecha por definir';
  const fecha = new Date(isoDate);
  return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatearHora = (isoDate) => {
  if (!isoDate) return '--:--';
  const fecha = new Date(isoDate);
  return fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });
};

// Función para simular el tipo de evento basado en el título (ya que el backend retorna 'EVENT' genérico)
const determinarTipoEvento = (titulo) => {
  const t = titulo.toLowerCase();
  if (t.includes('hackathon')) return 'Hackathon';
  if (t.includes('conferencia') || t.includes('charla')) return 'Conferencia';
  if (t.includes('taller') || t.includes('workshop')) return 'Workshop';
  return 'Meetup';
};