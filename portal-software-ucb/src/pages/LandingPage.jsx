import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, Globe, Shield, Cpu, Database, Calendar, ArrowUpRight, 
  User, Clock, Camera, Server, Smartphone, Gamepad2, Blocks, Cloud, 
  BarChart, GitBranch, Settings, X 
} from 'lucide-react';
import { api } from '../api/axiosConfig';
import bgVideo from '../assets/video_software.mp4';

// Lista de áreas de desempeño basadas en el folleto oficial
const areasDesempeno = [
  { id: 'admin-servidores', icon: Server, title: 'Administración de servidores', desc: 'Configuración, mantenimiento y monitoreo de servidores físicos y virtuales para garantizar la disponibilidad y el rendimiento de las aplicaciones y servicios.', color: 'bg-white' },
  { id: 'admin-bd', icon: Database, title: 'Administración de Base de datos', desc: 'Diseño, implementación y gestión de bases de datos relacionales y no relacionales, asegurando la integridad, seguridad y disponibilidad de la información.', color: 'bg-slate-50' },
  { id: 'gerente-ing', icon: Settings, title: 'Gerente de Ingeniería de Software', desc: 'Liderazgo técnico y gestión de equipos de desarrollo, planificación de proyectos, aseguramiento de la calidad y supervisión de todo el ciclo de vida del software.', color: 'bg-slate-50' },
  { id: 'gerente-producto', icon: Blocks, title: 'Gerente de producto', desc: 'Definición de la visión, estrategia y roadmap de productos de software, trabajando de cerca con stakeholders y equipos técnicos para entregar valor al usuario.', color: 'bg-white' },
  { id: 'ciberseguridad', icon: Shield, title: 'Ciberseguridad', desc: 'Protección de infraestructuras críticas, sistemas y redes contra ataques digitales, implementación de criptografía y prácticas de hacking ético.', color: 'bg-white' },
  { id: 'ia', icon: Cpu, title: 'Inteligencia Artificial', desc: 'Desarrollo de algoritmos de Machine Learning, Deep Learning, Visión Computacional y procesamiento de lenguaje natural aplicado a soluciones empresariales.', color: 'bg-slate-50' },
  { id: 'dev-movil', icon: Smartphone, title: 'Desarrollador de plataformas móviles', desc: 'Creación de aplicaciones nativas (iOS/Android) o multiplataforma enfocadas en la experiencia del usuario y el rendimiento en dispositivos móviles.', color: 'bg-slate-50' },
  { id: 'dev-web', icon: Globe, title: 'Desarrollador de Aplicaciones webs', desc: 'Construcción de arquitecturas escalables y desarrollo Full-Stack (Frontend y Backend) para ecosistemas digitales masivos y aplicaciones web complejas.', color: 'bg-white' },
  { id: 'dev-juegos', icon: Gamepad2, title: 'Desarrollador de videojuegos', desc: 'Programación de mecánicas, inteligencia artificial, físicas y gráficos utilizando motores de juego líderes en la industria interactiva.', color: 'bg-white' },
  { id: 'arq-software', icon: Blocks, title: 'Arquitectura de Software', desc: 'Diseño estructural de sistemas de software a gran escala, tomando decisiones críticas sobre patrones de diseño, frameworks y estándares técnicos.', color: 'bg-slate-50' },
  { id: 'arq-nube', icon: Cloud, title: 'Arquitectura en la nube', desc: 'Diseño, despliegue y administración avanzada de infraestructura, servicios y aplicaciones utilizando plataformas cloud como AWS, Azure o GCP.', color: 'bg-slate-50' },
  { id: 'ciencia-datos', icon: BarChart, title: 'Ciencia de datos', desc: 'Análisis avanzado de grandes volúmenes de datos para extraer conocimiento, identificar patrones y construir modelos predictivos que apoyen la toma de decisiones.', color: 'bg-white' },
  { id: 'analista-datos', icon: BarChart, title: 'Analista de datos', desc: 'Recopilación, procesamiento y visualización de datos para ayudar a las organizaciones a comprender su rendimiento y tomar decisiones estratégicas informadas.', color: 'bg-white' },
  { id: 'devops', icon: GitBranch, title: 'Ingeniero DevOps', desc: 'Automatización y optimización de los procesos de desarrollo, pruebas y despliegue continuo (CI/CD), integrando desarrollo y operaciones.', color: 'bg-slate-50' }
];

const LandingPage = () => {
  const [eventos, setEventos] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [galeria, setGaleria] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para controlar el modal de detalles de especialidad
  const [selectedArea, setSelectedArea] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventosRes, articulosRes, galeriaRes] = await Promise.all([
          api.get('/Eventos?filtro=proximos'),
          api.get('/Articulos'),
          api.get('/VidaEstudiantil/galeria')
        ]);
        setEventos(eventosRes.data.slice(0, 3));
        setArticulos(articulosRes.data.slice(0, 3));
        setGaleria(galeriaRes.data.slice(0, 8));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Función para cerrar el modal o drawer
  const closeAreaDetails = () => {
    setSelectedArea(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* 1. HERO SECTION (Dark Video) */}
      <section className="relative min-h-screen flex items-center pt-24 pb-32">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video src={bgVideo} autoPlay loop muted playsInline className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-primary/50 to-slate-900/80"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-12">
          <div className="max-w-4xl">
            <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-accent font-bold px-4 py-1.5 mb-6 uppercase tracking-widest text-xs rounded-full shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              Ingeniería de Software
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold text-white leading-[1.1] mb-8 drop-shadow-2xl">
              LIDERANDO LA <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">REVOLUCIÓN</span> <br/>
              DIGITAL.
            </h1>
            <p className="text-xl text-blue-100/90 mb-10 leading-relaxed max-w-2xl border-l-4 border-accent pl-6 font-medium">
              Formamos ingenieros innovadores, emprendedores e integrales capaces de diseñar, desplegar y mantener soluciones tecnológicas de alto impacto a nivel global.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/malla" className="btn-primary flex items-center justify-center gap-2 group">
                Explorar Programas <ChevronRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#areas" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 font-bold tracking-wide uppercase text-sm transition-all hover:bg-white hover:text-primary flex items-center justify-center">
                Ámbitos de Desempeño
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION (Glassmorphism Overlapping) */}
      <section className="relative z-20 -mt-24 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '9', text: 'Semestres de inmersión técnica' },
              { num: '210+', text: 'Destinos de intercambio global' },
              { num: '100%', text: 'Enfoque práctico desde el día uno', isAccent: true }
            ].map((stat, idx) => (
              <div key={idx} className={`p-8 backdrop-blur-xl border border-white/20 shadow-2xl transform transition-all hover:-translate-y-2 ${stat.isAccent ? 'bg-accent text-primary' : 'bg-white/90 text-primary'}`}>
                <h3 className="text-5xl font-display font-extrabold mb-2">{stat.num}</h3>
                <p className={`font-bold uppercase tracking-wider text-sm ${stat.isAccent ? 'text-primary/80' : 'text-slate-500'}`}>{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ESPECIALIDADES SECTION (Light bg-slate-50) */}
      <section id="areas" className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-100/50 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-display font-extrabold text-primary mb-6">
                Ámbito de desempeño laboral
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Nuestros graduados están preparados para liderar y transformar la industria en diversas áreas tecnológicas de alta demanda global.
              </p>
            </div>
            <Link to="/malla" className="group flex items-center gap-2 text-primary font-bold uppercase tracking-wide hover:text-accent transition-colors pb-2 border-b-2 border-transparent hover:border-accent">
              Ver malla curricular completa <ArrowUpRight className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={24} />
            </Link>
          </div>

          {/* Cuadrícula de especialidades ampliada */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {areasDesempeno.map((area, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedArea(area)}
                className="bg-white p-6 border border-slate-200 hover:border-accent shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col items-start"
              >
                <div className="bg-slate-50 group-hover:bg-accent p-3 rounded-lg text-primary group-hover:text-white transition-colors mb-4">
                  <area.icon size={24} />
                </div>
                <h3 className="text-lg font-display font-bold text-primary leading-tight">
                  {area.title}
                </h3>
                <div className="mt-4 flex items-center gap-1 text-sm font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver detalles <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal / Drawer para Detalles de Especialidad */}
      {selectedArea && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={closeAreaDetails}
          />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right overflow-y-auto">
            <div className="p-6 bg-primary text-white flex justify-between items-start sticky top-0 z-10 border-b border-white/10">
              <div className="flex items-center gap-4">
                 <div className="bg-white/10 p-3 rounded-xl text-accent">
                  <selectedArea.icon size={28} />
                 </div>
                 <h2 className="text-2xl font-display font-bold leading-tight">
                  {selectedArea.title}
                 </h2>
              </div>
              <button 
                onClick={closeAreaDetails}
                className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 flex-grow">
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-4">
                Descripción del Perfil
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {selectedArea.desc}
              </p>
              
              <div className="bg-slate-50 p-6 border border-slate-200 rounded-lg">
                <p className="text-sm text-slate-500 italic mb-4">
                  Esta es una de las áreas clave de desempeño laboral detalladas en el perfil profesional de la carrera de Ingeniería de Software de la UCB.
                </p>
                <Link 
                  to="/malla" 
                  className="w-full block text-center bg-primary text-white font-bold uppercase tracking-wide py-3 hover:bg-blue-900 transition-colors"
                >
                  Ver Malla Curricular
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. BLOG SECTION (Dark bg-primary) */}
      <section className="py-24 bg-primary text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/20 pb-8 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 text-white">Investigación y Noticias</h2>
              <p className="text-blue-200 text-lg">Descubrimientos, ensayos y actualidad de la facultad.</p>
            </div>
            <Link to="/blog" className="bg-transparent border-2 border-accent text-accent px-6 py-3 font-bold uppercase tracking-wide hover:bg-accent hover:text-primary transition-colors">
              Explorar el Blog
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
              <div className="lg:col-span-2 h-[500px] bg-white/10"></div>
              <div className="lg:col-span-1 flex flex-col gap-8"><div className="h-[234px] bg-white/10"></div><div className="h-[234px] bg-white/10"></div></div>
            </div>
          ) : articulos.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {articulos[0] && (
                <Link to={`/blog/${articulos[0].id}`} className="lg:col-span-2 group flex flex-col bg-white text-slate-800 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] transition-all transform hover:-translate-y-1">
                  {articulos[0].imageUrl && (
                    <div className="w-full h-80 overflow-hidden relative">
                      <img src={articulos[0].imageUrl} alt={articulos[0].titulo} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  )}
                  <div className="p-10 flex flex-col flex-grow">
                    <div className="text-accent font-bold uppercase tracking-wider text-sm mb-4">{articulos[0].categoria}</div>
                    <h3 className="text-3xl lg:text-4xl font-display font-bold text-primary mb-4 group-hover:text-secondary transition-colors leading-tight">
                      {articulos[0].titulo}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-8 line-clamp-3">
                      {articulos[0].contenido}
                    </p>
                    <div className="mt-auto flex items-center gap-6 text-sm font-bold text-slate-400 uppercase tracking-wide">
                      <span className="flex items-center gap-2"><User size={16} className="text-secondary" /> {articulos[0].autor}</span>
                      <span className="flex items-center gap-2"><Clock size={16} className="text-secondary" /> {articulos[0].tiempoLectura} min</span>
                    </div>
                  </div>
                </Link>
              )}
              <div className="lg:col-span-1 flex flex-col gap-8">
                {articulos.slice(1, 3).map(articulo => (
                  <Link key={articulo.id} to={`/blog/${articulo.id}`} className="group flex flex-col bg-white text-slate-800 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all transform hover:-translate-y-1 flex-grow">
                    {articulo.imageUrl && (
                      <div className="w-full h-48 overflow-hidden relative">
                        <img src={articulo.imageUrl} alt={articulo.titulo} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-accent font-bold uppercase tracking-wider text-xs mb-3">{articulo.categoria}</div>
                      <h3 className="text-xl font-display font-bold text-primary mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                        {articulo.titulo}
                      </h3>
                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wide">
                        <span className="flex items-center gap-2"><User size={14} className="text-secondary" /> {articulo.autor}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 border border-white/20 bg-white/5">
              <p className="text-blue-200 text-lg">No hay artículos publicados recientemente.</p>
            </div>
          )}
        </div>
      </section>

      {/* 5. VIDA ESTUDIANTIL SECTION (Light bg-white) */}
      <section className="py-24 bg-white text-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-200 pb-8 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 flex items-center gap-3 text-primary">
                <Camera className="text-accent" size={36} /> Vida Estudiantil
              </h2>
              <p className="text-slate-600 text-lg">Un vistazo a la experiencia universitaria dentro y fuera del aula.</p>
            </div>
            <Link to="/vida-estudiantil" className="bg-transparent border-2 border-primary text-primary px-6 py-3 font-bold uppercase tracking-wide hover:bg-primary hover:text-white transition-colors">
              Ver Galería Completa
            </Link>
          </div>

          {loading ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse bg-slate-200 w-full h-64 mb-4"></div>
              ))}
            </div>
          ) : galeria.length > 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {galeria.map((img) => (
                <div key={img.id} className="break-inside-avoid relative group overflow-hidden mb-4 bg-slate-100 cursor-pointer">
                  <img 
                    src={img.imageUrl} 
                    alt={img.descripcion} 
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="text-accent text-xs font-bold uppercase tracking-wider mb-2 drop-shadow-md">
                      {img.actividadAsociada}
                    </span>
                    <p className="text-white font-medium text-sm line-clamp-2 drop-shadow-md">
                      {img.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-slate-200 bg-slate-50">
              <p className="text-slate-500 text-lg">No hay imágenes en la galería por el momento.</p>
            </div>
          )}
        </div>
      </section>

      {/* 6. EVENTOS SECTION (Dark bg-slate-900) */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-800 pb-8 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 text-white">Agenda Académica</h2>
              <p className="text-slate-400 text-lg">Conferencias, hackatones y eventos clave de la facultad.</p>
            </div>
            <Link to="/eventos" className="bg-accent text-primary px-6 py-3 font-bold uppercase tracking-wide hover:bg-yellow-500 transition-colors">
              Calendario Completo
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse bg-slate-800 h-80 border border-white/5"></div>
              ))}
            </div>
          ) : eventos.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {eventos.map(evento => (
                <div key={evento.id} className="group bg-slate-800 border border-slate-700 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-all flex flex-col transform hover:-translate-y-1">
                  {evento.imageUrl ? (
                    <div className="overflow-hidden h-56 relative">
                      <img src={evento.imageUrl} alt={evento.titulo} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4 bg-accent text-primary font-bold uppercase tracking-wider text-xs px-3 py-1 shadow-lg">
                        {evento.categoria}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-56 bg-primary flex flex-col items-center justify-center text-accent relative">
                      <Calendar size={64} strokeWidth={1} />
                      <div className="absolute top-4 left-4 bg-accent text-primary font-bold uppercase tracking-wider text-xs px-3 py-1 shadow-lg">
                        {evento.categoria}
                      </div>
                    </div>
                  )}
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="text-slate-400 text-sm flex items-center gap-2 mb-3 font-bold uppercase tracking-wide">
                      <Calendar size={16} className="text-secondary" />
                      {new Date(evento.fechaInicio).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="font-display font-bold text-2xl mb-4 text-white group-hover:text-accent transition-colors line-clamp-2">
                      {evento.titulo}
                    </h3>
                    <div className="mt-auto pt-6 border-t border-slate-700">
                      <Link to={`/eventos/${evento.id}`} className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-wide text-sm group-hover:text-accent transition-colors">
                        Ver detalles <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-800 border border-slate-700">
              <p className="text-slate-400 text-lg">No hay eventos próximos programados.</p>
            </div>
          )}
        </div>
      </section>

      <style dangerouslySetRenderedHTML={{__html: `
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default LandingPage;