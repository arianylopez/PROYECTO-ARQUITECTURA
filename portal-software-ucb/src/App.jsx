import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import AdminLayout from './components/layout/AdminLayout';

// Páginas Públicas
import LandingPage from './pages/LandingPage';
import MallaCurricular from './pages/MallaCurricular';
import DirectorioDocentes from './pages/DirectorioDocentes';
import AgendaEventos from './pages/AgendaEventos';
import BlogAcademico from './pages/BlogAcademico';
import VidaEstudiantil from './pages/VidaEstudiantil';
import ArticuloDetalle from './pages/ArticuloDetalle';

// Páginas de Administración
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminEventos from './pages/admin/AdminEventos';
import AdminDocentes from './pages/admin/AdminDocentes';
import AdminArticulos from './pages/admin/AdminArticulos';
import AdminVidaEstudiantil from './pages/admin/AdminVidaEstudiantil';
import EventoDetalle from './pages/EventoDetalle';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col font-sans">
          <Routes>
            {/* Rutas Administrativas (Sin Navbar Público) */}
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/eventos" element={<AdminEventos />} />
                      <Route path="/articulos" element={<AdminArticulos />} />
                      <Route path="/docentes" element={<AdminDocentes />} />
                      <Route path="/vida-estudiantil" element={<AdminVidaEstudiantil />} />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />

            {/* Rutas Públicas (Con Navbar Público) */}
            <Route 
              path="/*" 
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/malla" element={<MallaCurricular />} />
                      <Route path="/docentes" element={<DirectorioDocentes />} />
                      <Route path="/eventos" element={<AgendaEventos />} />
                      <Route path="/eventos/:id" element={<EventoDetalle />} />
                      <Route path="/blog" element={<BlogAcademico />} />
                      <Route path="/blog/:id" element={<ArticuloDetalle />} />
                      <Route path="/vida-estudiantil" element={<VidaEstudiantil />} />
                    </Routes>
                  </main>
                </>
              } 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;