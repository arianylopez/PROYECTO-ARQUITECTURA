export const renderSidebar = () => {
  // Array para generar los enlaces dinámicamente, asegurando consistencia (Heurística Nielsen)
  const menuItems = [
    { icon: 'ph-squares-four', label: 'General', path: '#/' },
    { icon: 'ph-book-open', label: 'Materias', path: '#/materias' },
    { icon: 'ph-users-three', label: 'Docentes', path: '#/docentes' },
    { icon: 'ph-images', label: 'Galería', path: '#/galeria' }, // <-- ACTUALIZADO
    { icon: 'ph-graduation-cap', label: 'Graduados', path: '#/alumni' }
  ];

  const generateMenu = () => {
    return menuItems.map(item => `
      <a href="${item.path}" style="
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        text-decoration: none;
        color: ${item.active ? 'var(--ucb-primary)' : 'var(--text-muted)'};
        background: ${item.active ? '#EEF2F6' : 'transparent'};
        border-radius: var(--radius-sm);
        font-weight: 500;
        margin-bottom: 8px;
        transition: all 0.2s ease;
      " onmouseover="this.style.background='#EEF2F6'" onmouseout="this.style.background='${item.active ? '#EEF2F6' : 'transparent'}'">
        <i class="ph ${item.icon}" style="font-size: 20px;"></i>
        ${item.label}
        ${item.active ? `<i class="ph ph-caret-right" style="margin-left: auto;"></i>` : ''}
      </a>
    `).join('');
  };

  return `
    <aside style="
      width: 250px;
      min-width: 250px;
      background: var(--bg-surface);
      border-radius: var(--radius-md);
      padding: 24px 16px;
      box-shadow: var(--shadow-sm);
      height: fit-content;
    ">
      <nav>
        ${generateMenu()}
      </nav>
    </aside>
  `;
};