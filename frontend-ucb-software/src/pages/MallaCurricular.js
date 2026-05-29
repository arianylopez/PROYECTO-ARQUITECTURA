import '../css/malla.css';
import { getMallaCurricular } from '../services/academicoService.js';
import { openSubjectModal } from '../components/SubjectModal.js';

export const renderMallaCurricular = async (container) => {
  // 1. Mostrar estado de carga (UX)
  container.innerHTML = `
    <div class="loader-container">
      <div class="spinner"></div>
      <p>Cargando plan de estudios...</p>
    </div>
  `;

  try {
    // 2. Consumir la API
    const materias = await getMallaCurricular();
    
    // 3. Agrupar las materias por el número de semestre
    const semestres = agruparPorSemestre(materias);

    // 4. Construir la interfaz iterando sobre los datos
    const contentHtml = `
      <section class="malla-container">
        <header class="malla-header">
          <h1>INGENIERÍA DE SOFTWARE</h1>
          <p>Malla Curricular Oficial • 9 Semestres</p>
        </header>

        <div class="semestres-grid">
          ${Object.keys(semestres).map(num => `
            <article class="semestre-card">
              <header class="semestre-header">
                <div class="semestre-badge">${num}</div>
                <div class="semestre-title">
                  <h2>Semestre ${num}</h2>
                  <span>${semestres[num].length} materias</span>
                </div>
              </header>
              <ul class="materias-list">
                ${semestres[num].map(m => `
                  <li class="materia-item" data-code="${m.code}">
                    <i class="ph ph-book-open"></i> 
                    ${m.name}
                  </li>
                `).join('')}
              </ul>
            </article>
          `).join('')}
        </div>
      </section>
    `;

    // 5. Inyectar en el DOM
    container.innerHTML = contentHtml;

    // 6. Asignar los eventos de click (Para el futuro Modal)
    agregarEventosMaterias();

  } catch (error) {
    console.error("Error renderizando la malla:", error);
    container.innerHTML = `
      <div style="padding: 24px; background: #FEE2E2; color: #991B1B; border-radius: 8px;">
        <h3>Error de Conexión</h3>
        <p>No se pudo conectar con el servidor de la universidad. Por favor, verifica que el backend esté ejecutándose.</p>
      </div>
    `;
  }
};

// Función auxiliar para agrupar el array plano que devuelve la API
const agruparPorSemestre = (materias) => {
  return materias.reduce((acumulador, materia) => {
    const sem = materia.semesterNumber;
    if (!acumulador[sem]) acumulador[sem] = [];
    acumulador[sem].push(materia);
    return acumulador;
  }, {});
};

const agregarEventosMaterias = () => {
  const items = document.querySelectorAll('.materia-item');
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      const code = e.currentTarget.dataset.code;
      // Reemplazamos el alert() con la invocación de nuestro Modal
      openSubjectModal(code);
    });
  });
};