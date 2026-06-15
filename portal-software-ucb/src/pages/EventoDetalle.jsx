import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, ExternalLink, Tag } from 'lucide-react';
import { api } from '../api/axiosConfig';

const EventoDetalle = () => {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await api.get(`/Eventos/${id}`);
        setEvento(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvento();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!evento) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Evento no encontrado</h2>
        <Link to="/eventos" className="text-secondary hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Volver a la cartelera
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <section className="bg-primary text-white pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/eventos" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-wider">
            <ArrowLeft size={16} /> Volver a Eventos
          </Link>
          <div className="inline-block bg-accent text-primary font-bold px-3 py-1 mb-6 uppercase tracking-wider text-xs">
            {evento.categoria}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-6 leading-tight">
            {evento.titulo}
          </h1>
        </div>
      </section>

      <section className="py-12 flex-grow -mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl border border-slate-200 overflow-hidden">
            {evento.imageUrl && (
              <div className="w-full h-64 md:h-96 relative">
                <img 
                  src={evento.imageUrl} 
                  alt={evento.titulo} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12">
              <div className="flex-grow">
                <h3 className="text-2xl font-display font-bold text-primary mb-4">Acerca de este evento</h3>
                <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {evento.descripcion}
                </div>
              </div>

              <div className="w-full md:w-72 shrink-0 space-y-6 bg-slate-50 p-6 border border-slate-100 h-fit">
                <div className="flex items-start gap-3">
                  <Calendar className="text-accent mt-1 shrink-0" size={20} />
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fecha y Hora</div>
                    <div className="font-medium text-slate-800">
                      {new Date(evento.fechaInicio).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="text-sm text-slate-500">
                      {new Date(evento.fechaInicio).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="text-accent mt-1 shrink-0" size={20} />
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ubicación</div>
                    <div className="font-medium text-slate-800">{evento.lugar}</div>
                  </div>
                </div>

                {evento.maxParticipantes && (
                  <div className="flex items-start gap-3">
                    <Users className="text-accent mt-1 shrink-0" size={20} />
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Capacidad</div>
                      <div className="font-medium text-slate-800">{evento.maxParticipantes} cupos</div>
                    </div>
                  </div>
                )}

                {evento.inscripcionUrl && (
                  <div className="pt-4 border-t border-slate-200">
                    <a 
                      href={evento.inscripcionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-primary text-white text-center py-3 font-bold uppercase tracking-wider hover:bg-blue-900 transition-colors flex justify-center items-center gap-2"
                    >
                      Inscribirse <ExternalLink size={18} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventoDetalle;