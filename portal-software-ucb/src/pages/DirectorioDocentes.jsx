import { useState, useEffect } from 'react';
import { ExternalLink, User, Briefcase } from 'lucide-react';
import { api } from '../api/axiosConfig';

const DirectorioDocentes = () => {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const response = await api.get('/Docentes');
        setDocentes(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocentes();
  }, []);

  const getInitials = (name) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block bg-accent text-primary font-bold px-3 py-1 mb-4 uppercase tracking-wider text-xs">
              Comunidad Académica
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-6">
              Nuestros Docentes
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              Un plantel de expertos y líderes de la industria tecnológica comprometidos con la excelencia académica y la formación integral de los futuros ingenieros.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse bg-white p-6 shadow-sm border border-slate-100 flex flex-col items-center">
                  <div className="w-32 h-32 bg-slate-200 rounded-full mb-6"></div>
                  <div className="h-6 bg-slate-200 w-3/4 mb-3"></div>
                  <div className="h-4 bg-slate-200 w-1/2 mb-6"></div>
                  <div className="h-20 bg-slate-100 w-full"></div>
                </div>
              ))}
            </div>
          ) : docentes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {docentes.map((docente) => (
                <div key={docente.id} className="bg-white group hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col">
                  <div className="p-8 flex flex-col items-center text-center flex-grow">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-slate-50 shadow-inner bg-slate-100 flex items-center justify-center">
                      {docente.photoUrl ? (
                        <img 
                          src={docente.photoUrl} 
                          alt={docente.nombreCompleto} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                        />
                      ) : (
                        <span className="text-4xl font-display font-bold text-slate-300">
                          {getInitials(docente.nombreCompleto)}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-display font-bold text-primary mb-2">
                      {docente.nombreCompleto}
                    </h3>
                    
                    <div className="flex items-center justify-center gap-2 text-accent font-medium text-sm mb-4">
                      <Briefcase size={16} />
                      <span>{docente.cargo}</span>
                    </div>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {docente.descripcion}
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-center mt-auto">
                    {docente.linkedinUrl ? (
                      <a 
                        href={docente.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate-500 hover:text-secondary font-medium transition-colors text-sm"
                      >
                        <ExternalLink size={18} /> Perfil Profesional
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 text-slate-400 text-sm">
                        <User size={18} /> UCB Santa Cruz
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-slate-200">
              <p className="text-slate-500 text-lg">No hay docentes registrados por el momento.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DirectorioDocentes;