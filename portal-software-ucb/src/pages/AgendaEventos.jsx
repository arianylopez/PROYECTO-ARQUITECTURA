import { useState, useEffect } from 'react';
import { Calendar, MapPin, ExternalLink, Tag } from 'lucide-react';
import { api } from '../api/axiosConfig';
import { Link } from 'react-router-dom';

const AgendaEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroActivo, setFiltroActivo] = useState('proximos');

  useEffect(() => {
    const fetchEventos = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/Eventos?filtro=${filtroActivo}`);
        setEventos(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventos();
  }, [filtroActivo]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <section className="pt-32 pb-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-2xl">
              <div className="inline-block bg-accent text-primary font-bold px-3 py-1 mb-4 uppercase tracking-wider text-xs">
                Difusión y Actividades
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary mb-4">
                Cartelera de Eventos
              </h1>
              <p className="text-slate-600 text-lg">
                Mantente informado sobre talleres, conferencias, hackatones y actividades organizadas por la carrera.
              </p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-none border border-slate-200">
              <button
                onClick={() => setFiltroActivo('proximos')}
                className={`px-6 py-2 text-sm font-bold tracking-wide uppercase transition-colors ${
                  filtroActivo === 'proximos' ? 'bg-primary text-white' : 'text-slate-500 hover:text-primary'
                }`}
              >
                Próximos
              </button>
              <button
                onClick={() => setFiltroActivo('pasados')}
                className={`px-6 py-2 text-sm font-bold tracking-wide uppercase transition-colors ${
                  filtroActivo === 'pasados' ? 'bg-primary text-white' : 'text-slate-500 hover:text-primary'
                }`}
              >
                Histórico
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-white p-6 border border-slate-200 flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-64 h-40 bg-slate-200"></div>
                  <div className="flex-grow space-y-4 py-2">
                    <div className="h-4 bg-slate-200 w-24"></div>
                    <div className="h-6 bg-slate-200 w-3/4"></div>
                    <div className="h-4 bg-slate-200 w-full"></div>
                    <div className="h-4 bg-slate-200 w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : eventos.length > 0 ? (
            <div className="space-y-6">
              {eventos.map((evento) => (
                <div key={evento.id} className="bg-white border border-slate-200 hover:shadow-lg transition-shadow group flex flex-col md:flex-row overflow-hidden">
                  <div className="w-full md:w-72 h-48 md:h-auto bg-slate-100 relative shrink-0">
                    {evento.imageUrl ? (
                      <img 
                        src={evento.imageUrl} 
                        alt={evento.titulo} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                        <Calendar size={48} strokeWidth={1} />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      {evento.categoria}
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 flex-grow flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm font-medium text-slate-500 mb-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={16} className="text-accent" />
                        {new Date(evento.fechaInicio).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={16} className="text-accent" />
                        {evento.lugar}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                      {evento.titulo}
                    </h3>
                    
                    <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed">
                      {evento.descripcion}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-auto pt-6">
                      <Link 
                        to={`/eventos/${evento.id}`} 
                        className="bg-primary text-white px-6 py-2 text-sm font-bold uppercase tracking-wide hover:bg-blue-900 transition-colors"
                      >
                        Ver detalles
                      </Link>
                      
                      {evento.inscripcionUrl && filtroActivo === 'proximos' && (
                        <a 
                          href={evento.inscripcionUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-accent text-primary px-6 py-2 text-sm font-bold uppercase tracking-wide hover:bg-yellow-500 transition-colors flex items-center gap-2"
                        >
                          Inscribirse <ExternalLink size={16} />
                        </a>
                      )}
                      
                      {evento.maxParticipantes && (
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium ml-auto">
                          <User size={16} />
                          Cupos: {evento.maxParticipantes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white border border-slate-200">
              <Tag size={48} className="mx-auto text-slate-300 mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-display font-bold text-primary mb-2">No hay eventos para mostrar</h3>
              <p className="text-slate-500">No se encontraron eventos en la categoría seleccionada.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AgendaEventos;