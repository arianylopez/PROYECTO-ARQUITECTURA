import { useState, useEffect } from 'react';
import { Camera, Quote } from 'lucide-react';
import { api } from '../api/axiosConfig';

const VidaEstudiantil = () => {
  const [galeria, setGaleria] = useState([]);
  const [relatos, setRelatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [galeriaRes, relatosRes] = await Promise.all([
          api.get('/VidaEstudiantil/galeria'),
          api.get('/VidaEstudiantil/relatos')
        ]);
        setGaleria(galeriaRes.data);
        setRelatos(relatosRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <section className="pt-32 pb-16 bg-primary border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-accent text-primary font-bold px-3 py-1 mb-4 uppercase tracking-wider text-xs">
            Experiencia Universitaria
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-6 text-white">
            Vida Estudiantil
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Más allá del código. Conoce los espacios, los momentos y las voces de quienes conforman nuestra comunidad.
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Camera size={28} className="text-accent" />
            <h2 className="text-3xl font-display font-bold">Galería de Actividades</h2>
          </div>

          {loading ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse bg-slate-800 w-full h-64 mb-4"></div>
              ))}
            </div>
          ) : galeria.length > 0 ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {galeria.map((img) => (
                <div key={img.id} className="break-inside-avoid relative group overflow-hidden bg-slate-800">
                  <img 
                    src={img.imageUrl} 
                    alt={img.descripcion} 
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-accent text-xs font-bold uppercase tracking-wider mb-1">
                      {img.actividadAsociada}
                    </span>
                    <p className="text-white font-medium text-sm">
                      {img.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-slate-800 bg-slate-800/50">
              <p className="text-slate-400">La galería se está actualizando.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-slate-800 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Quote size={28} className="text-accent" />
            <h2 className="text-3xl font-display font-bold">Voces Estudiantiles</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="animate-pulse bg-slate-700 p-8 h-48"></div>
              ))}
            </div>
          ) : relatos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatos.map((relato) => (
                <div key={relato.id} className="bg-slate-900 p-8 border-l-4 border-accent relative">
                  <Quote size={40} className="absolute top-4 right-4 text-slate-800" />
                  <p className="text-slate-300 leading-relaxed italic mb-8 relative z-10">
                    "{relato.experiencia}"
                  </p>
                  <div className="flex items-center gap-4">
                    {relato.fotoUrl ? (
                      <img src={relato.fotoUrl} alt={relato.nombreEstudiante} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-accent font-bold">
                        {relato.nombreEstudiante.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-white">{relato.nombreEstudiante}</div>
                      <div className="text-xs text-accent uppercase tracking-wider">{relato.actividadRelacionada}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-slate-700 bg-slate-900/50">
              <p className="text-slate-400">Aún no hay relatos publicados.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default VidaEstudiantil;