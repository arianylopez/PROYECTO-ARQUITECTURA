import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Malla Curricular', path: '/malla' },
    { name: 'Docentes', path: '/docentes' },
    { name: 'Eventos', path: '/eventos' },
    { name: 'Blog', path: '/blog' },
    { name: 'Vida Estudiantil', path: '/vida-estudiantil' },
  ];

  // Lógica inteligente de transparencia:
  // Solo es transparente (texto blanco) si estamos en la Landing Page Y no hemos hecho scroll
  const isHome = location.pathname === '/';
  const isTransparent = isHome && !scrolled;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isTransparent 
        ? 'bg-gradient-to-b from-slate-900/80 to-transparent py-6' 
        : 'bg-white/90 backdrop-blur-md shadow-sm py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <span className={`font-display font-extrabold text-2xl tracking-tight transition-colors duration-300 ${
                isTransparent ? 'text-white' : 'text-primary'
              }`}>
                Ing. de Software
              </span>
              <span className="bg-accent text-primary text-xs font-bold px-2 py-1 rounded-sm shadow-md group-hover:bg-yellow-400 transition-colors">
                UCB
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-bold tracking-wide uppercase transition-colors duration-300 ${
                  isTransparent
                    ? 'text-white/80 hover:text-accent'
                    : location.pathname === link.path 
                      ? 'text-secondary' 
                      : 'text-slate-600 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/login" className="bg-accent text-primary font-bold uppercase tracking-wide text-xs px-5 py-2.5 rounded-sm hover:bg-yellow-400 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              Portal CMS
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={isTransparent ? 'text-white' : 'text-primary'}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 rounded-md text-base font-bold uppercase tracking-wide ${
                  location.pathname === link.path ? 'bg-blue-50 text-secondary' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;