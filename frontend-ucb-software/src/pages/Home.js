// src/pages/Home.js
import '../css/home.css';
import { getBanners } from '../services/multimediaService.js';

const heroText = localStorage.getItem('ucb_home_hero_text') || 'Desarrolla sistemas robustos, lidera proyectos tecnológicos y transforma el futuro digital con una sólida base científica, técnica y ética.';

export const renderHome = async (container) => {
  // 1. Renderizar la estructura base con un "spinner" en la zona de la imagen
  container.innerHTML = `
    <div class="home-container">
      <section class="home-hero">
        <div class="home-hero-text">
          <div class="hero-icon-wrapper">
            <i class="ph ph-code" style="font-size: 32px; color: var(--ucb-primary);"></i>
          </div>
          <h1>INGENIERÍA DE SOFTWARE</h1>
          
          <p>${heroText}</p>
          
        </div>
        
        <div class="home-hero-image" id="hero-banner-container" style="overflow: hidden; position: relative;">
          <div class="spinner"></div>
        </div>
      </section>

      <section class="info-card">
        <header class="info-card-header">
          <i class="ph ph-book-open-text"></i>
          <h2>Información General</h2>
        </header>
        
        <div class="info-grid">
          <div class="info-block duration">
            <h3><i class="ph ph-clock-countdown"></i> Duración</h3>
            <p>4 años y medio (9 semestres)</p>
          </div>
          
          <div class="info-block modality">
            <h3><i class="ph ph-graduation-cap"></i> Modalidad de Graduación</h3>
            <ul>
              <li>Tesis de Grado</li>
              <li>Proyecto de Grado</li>
              <li>Trabajo Dirigido</li>
              <li>Diplomado</li>
              <li>Graduación por Excelencia</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  `;

  // 2. Consumir la API y reemplazar la imagen
  try {
    const banners = await getBanners();
    const bannerContainer = document.getElementById('hero-banner-container');
    
    if (banners && banners.length > 0) {
      // Tomamos el banner con mayor prioridad (PositionOrder)
      const mainBanner = banners[0]; 
      bannerContainer.innerHTML = `
        <img src="${mainBanner.imageUrl}" alt="${mainBanner.title}" 
             style="width: 100%; height: 100%; object-fit: cover; animation: fadeIn 0.5s ease;" />
      `;
    } else {
      // Fallback elegante si no hay banners registrados en la BD
      bannerContainer.innerHTML = `
        <div style="text-align: center; color: var(--text-muted);">
          <i class="ph ph-image" style="font-size: 48px; margin-bottom: 8px;"></i>
          <p>Campus UCB Santa Cruz</p>
        </div>
      `;
    }
  } catch (error) {
    console.error("Error cargando el banner:", error);
    document.getElementById('hero-banner-container').innerHTML = `
      <i class="ph ph-image-broken" style="font-size: 48px; color: #CBD5E1;"></i>
    `;
  }
};