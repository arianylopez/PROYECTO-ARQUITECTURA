import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-primary flex items-center gap-3">
          <LayoutDashboard className="text-accent" />
          Panel de Control
        </h1>
        <p className="text-slate-600 mt-2">
          Bienvenido de vuelta, {user?.firstName}. Desde aquí puedes administrar todo el contenido del portal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Eventos Activos', value: 'Gestión', color: 'bg-blue-50 text-blue-600' },
          { label: 'Artículos', value: 'Blog', color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Docentes', value: 'Directorio', color: 'bg-amber-50 text-amber-600' },
          { label: 'Multimedia', value: 'Galería', color: 'bg-purple-50 text-purple-600' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">{stat.label}</div>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;