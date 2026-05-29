// src/pages/Login.js
import '../css/login.css';
import { loginUser } from '../services/authService.js';

export const renderLogin = (container) => {
  container.innerHTML = `
    <div class="login-container">
      <div class="login-card">
        <div class="login-icon">
          <i class="ph ph-lock-key"></i>
        </div>
        <h1>Acceso Restringido</h1>
        <p>Portal de administración para Jefatura de Carrera</p>
        
        <div id="login-error" class="error-message"></div>

        <form id="login-form">
          <div class="form-group">
            <label for="email">Correo Institucional</label>
            <input type="email" id="email" class="form-control" placeholder="jefatura@ucb.edu.bo" required autocomplete="email" />
          </div>
          
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" class="form-control" placeholder="••••••••" required autocomplete="current-password" />
          </div>

          <button type="submit" class="btn-submit" id="btn-login">Ingresar</button>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById('login-form');
  const errorDiv = document.getElementById('login-error');
  const btnSubmit = document.getElementById('btn-login');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitamos que la página se recargue
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Estado de carga
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Verificando...';
    errorDiv.style.display = 'none';

    try {
      // Llamamos a nuestro servicio (que internamente hace el fetch al backend)
      await loginUser(email, password);
      
      // Si todo sale bien, redirigimos al dashboard de administrador
      window.location.hash = '#/admin';
      
    } catch (error) {
      // Si el backend devuelve 401 Unauthorized u otro error
      errorDiv.textContent = 'Credenciales incorrectas o acceso denegado.';
      errorDiv.style.display = 'block';
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = 'Ingresar';
    }
  });
};