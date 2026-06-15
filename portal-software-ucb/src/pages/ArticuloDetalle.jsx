import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Tag, Calendar } from 'lucide-react';
import { api } from '../api/axiosConfig';

const ArticuloDetalle = () => {
  const { id } = useParams();
  const [articulo, setArticulo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticulo = async () => {
      try {
        const response = await api.get(`/Articulos/${id}`);
        setArticulo(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticulo();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!articulo) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Artículo no encontrado</h2>
        <Link to="/blog" className="text-secondary hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Volver al blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <section className="bg-white pt-32 pb-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition-colors text-sm font-bold uppercase tracking-wider">
            <ArrowLeft size={16} /> Volver al Blog
          </Link>
          
          <div className="mb-6 flex items-center gap-3">
            <span className="bg-accent text-primary font-bold px-3 py-1 uppercase tracking-wider text-xs">
              {articulo.categoria}
            </span>
            <span className="text-slate-400 text-sm flex items-center gap-1 font-medium">
              <Clock size={14} /> {articulo.tiempoLectura} min
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-primary mb-8 leading-tight">
            {articulo.titulo}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 font-medium py-4 border-y border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-primary font-bold">
                {articulo.autor.charAt(0)}
              </div>
              <span>Por <strong className="text-primary">{articulo.autor}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-slate-400" />
              {new Date(articulo.fechaPublicacion).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 flex-grow bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {articulo.imageUrl && (
            <div className="w-full h-[400px] mb-12 relative overflow-hidden bg-slate-100">
              <img 
                src={articulo.imageUrl} 
                alt={articulo.titulo} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:text-primary prose-a:text-secondary">
            {/* Si el contenido viene con saltos de línea, los respetamos */}
            {articulo.contenido.split('\n').map((parrafo, index) => (
              <p key={index} className="mb-6 text-slate-700 leading-relaxed">
                {parrafo}
              </p>
            ))}
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-200 flex items-center gap-3">
            <Tag size={20} className="text-slate-400" />
            <span className="text-slate-500 font-medium">Archivado en:</span>
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-bold">
              {articulo.categoria}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticuloDetalle;