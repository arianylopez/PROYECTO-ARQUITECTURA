import { useState, useEffect } from 'react';
import { Clock, User, ArrowRight, Tag } from 'lucide-react';
import { api } from '../api/axiosConfig';
import { Link } from 'react-router-dom';

const BlogAcademico = () => {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await api.get('/Articulos');
        setArticulos(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticulos();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <section className="pt-32 pb-16 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block bg-accent text-primary font-bold px-3 py-1 mb-4 uppercase tracking-wider text-xs">
              Investigación y Publicaciones
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary mb-6">
              Blog Académico
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              Artículos, ensayos y descubrimientos escritos por nuestros estudiantes y docentes.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="space-y-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex flex-col gap-4">
                  <div className="h-64 bg-slate-200 w-full"></div>
                  <div className="h-4 bg-slate-200 w-32"></div>
                  <div className="h-8 bg-slate-200 w-3/4"></div>
                  <div className="h-4 bg-slate-200 w-full"></div>
                </div>
              ))}
            </div>
          ) : articulos.length > 0 ? (
            <div className="space-y-16">
              {articulos.map((articulo) => (
                <article key={articulo.id} className="group cursor-pointer">
                  {articulo.imageUrl && (
                    <div className="w-full h-80 bg-slate-100 mb-6 overflow-hidden relative">
                      <img 
                        src={articulo.imageUrl} 
                        alt={articulo.titulo} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                        {articulo.categoria}
                      </div>
                    </div>
                  )}
                  
                  {!articulo.imageUrl && (
                    <div className="mb-4 inline-block bg-slate-100 text-slate-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      {articulo.categoria}
                    </div>
                  )}

                  <h2 className="text-3xl font-display font-bold text-primary mb-4 group-hover:text-secondary transition-colors">
                    {articulo.titulo}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-6 font-medium">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-accent" />
                      {articulo.autor}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-accent" />
                      {articulo.tiempoLectura} min de lectura
                    </div>
                    {articulo.fechaPublicacion && (
                      <div className="flex items-center gap-2">
                        <Tag size={16} className="text-accent" />
                        {new Date(articulo.fechaPublicacion).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                    {articulo.contenido}
                  </p>

                  {/* No olvides importar Link desde 'react-router-dom' arriba junto con las otras importaciones */}
                    <Link 
                    to={`/blog/${articulo.id}`} 
                    className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wide text-sm hover:text-secondary transition-colors mt-auto"
                    >
                    Leer artículo completo <ArrowRight size={16} />
                    </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-slate-200">
              <p className="text-slate-500 text-lg">Aún no hay artículos publicados en el blog.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogAcademico;