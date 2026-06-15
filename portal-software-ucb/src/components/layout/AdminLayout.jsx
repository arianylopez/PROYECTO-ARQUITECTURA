import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, FileText, Users, Image, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Calendar, label: 'Eventos', path: '/admin/eventos' },
    { icon: FileText, label: 'Artículos', path: '/admin/articulos' },
    { icon: Users, label: 'Docentes', path: '/admin/docentes' },
    { icon: Image, label: 'Vida Estudiantil', path: '/admin/vida-estudiantil' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className={`bg-primary text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col fixed h-full z-20`}>
        <div className="h-20 flex items-center justify-between px-4 border-b border-white/10">
          {isSidebarOpen && (
            <span className="font-display font-bold text-lg truncate">Portal CMS</span>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-3 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-accent text-primary font-bold' : 'hover:bg-white/10 text-slate-300 hover:text-white'
                }`}
                title={!isSidebarOpen ? item.label : ''}
              >
                <item.icon size={20} className="shrink-0" />
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-3 py-3 w-full rounded-lg hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} className="shrink-0" />
            {isSidebarOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-end px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-primary">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-slate-500">Administrador</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-accent font-bold">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
          </div>
        </header>
        <div className="p-8 flex-grow">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;