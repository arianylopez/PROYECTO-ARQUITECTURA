import { useState, useEffect } from 'react';
import { X, BookOpen, Target, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { api } from '../api/axiosConfig';

const MallaCurricular = () => {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [materiaDetail, setMateriaDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await api.get('/Malla/materias');
        setMaterias(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterias();
  }, []);

  const openMateriaDetail = async (sigla) => {
    setIsDrawerOpen(true);
    setLoadingDetail(true);
    setSelectedMateria(sigla);
    
    try {
      const response = await api.get(`/Malla/materias/${sigla}`);
      setMateriaDetail(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setSelectedMateria(null);
      setMateriaDetail(null);
    }, 300);
  };

  const semestres = Array.from({ length: 9 }, (_, i) => i + 1);

  const getMateriasBySemestre = (semestre) => {
    return materias.filter(m => m.semestre === semestre);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 flex flex-col">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col">
        <div className="mb-10">
          <div className="inline-block bg-accent text-primary font-bold px-3 py-1 mb-4 uppercase tracking-wider text-xs rounded-full">
            Plan de Estudios
          </div>
          <h1 className="text-4xl font-display font-extrabold text-primary mb-4">
            Malla Curricular Interactiva
          </h1>
          <p className="text-slate-600 max-w-2xl text-lg">
            Explora las asignaturas organizadas por semestre. Haz clic en cualquier materia para conocer sus objetivos, contenidos y el flujo de prerrequisitos.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64 flex-grow">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="flex-grow overflow-x-auto pb-8 snap-x">
            <div className="flex gap-6 min-w-max">
              {semestres.map((semestre) => (
                <div key={semestre} className="w-80 flex-shrink-0 snap-start flex flex-col">
                  <div className="bg-primary text-white font-bold py-3 px-4 rounded-t-xl sticky top-0 z-10 flex justify-between items-center shadow-md">
                    <span>Semestre {semestre}</span>
                    <span className="bg-white/20 text-xs px-2 py-1 rounded-md">{getMateriasBySemestre(semestre).length} materias</span>
                  </div>
                  <div className="bg-slate-100/50 p-4 rounded-b-xl flex-grow border border-t-0 border-slate-200 flex flex-col gap-3">
                    {getMateriasBySemestre(semestre).map((materia) => (
                      <div 
                        key={materia.sigla}
                        onClick={() => openMateriaDetail(materia.sigla)}
                        className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer transition-all hover:border-accent hover:shadow-md hover:-translate-y-1 group"
                      >
                        <div className="text-xs font-bold text-slate-400 mb-1 group-hover:text-accent transition-colors">
                          {materia.sigla}
                        </div>
                        <h3 className="font-bold text-primary text-sm leading-snug mb-3">
                          {materia.nombre}
                        </h3>
                        <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                          <span>{materia.creditos} Créditos</span>
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-accent" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={closeDrawer}
          />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right overflow-y-auto">
            <div className="p-6 bg-primary text-white flex justify-between items-start sticky top-0 z-10">
              <div>
                <div className="bg-white/20 inline-block px-2 py-1 rounded text-xs font-bold mb-2">
                  {selectedMateria} • Semestre {materiaDetail?.semestre || '...'}
                </div>
                <h2 className="text-2xl font-display font-bold">
                  {materiaDetail ? materiaDetail.nombre : 'Cargando...'}
                </h2>
              </div>
              <button 
                onClick={closeDrawer}
                className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 flex-grow">
              {loadingDetail || !materiaDetail ? (
                <div className="space-y-6 animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-32 bg-slate-100 rounded-xl mt-8"></div>
                </div>
              ) : (
                <div className="space-y-8">
                  
                  <section>
                    <h3 className="flex items-center gap-2 text-lg font-bold text-primary mb-3">
                      <BookOpen size={20} className="text-accent" /> Descripción
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {materiaDetail.descripcion || 'Sin descripción disponible.'}
                    </p>
                  </section>

                  <section>
                    <h3 className="flex items-center gap-2 text-lg font-bold text-primary mb-3">
                      <Target size={20} className="text-accent" /> Objetivos de Aprendizaje
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {materiaDetail.objetivos || 'Sin objetivos definidos.'}
                    </p>
                  </section>

                  <section>
                    <h3 className="flex items-center gap-2 text-lg font-bold text-primary mb-3">
                      <Layers size={20} className="text-accent" /> Contenidos Principales
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {materiaDetail.contenidos || 'Contenidos en actualización.'}
                    </p>
                  </section>

                  <div className="border-t border-slate-200 my-6"></div>

                  <section>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                      Prerrequisitos
                    </h3>
                    {materiaDetail.prerrequisitos.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {materiaDetail.prerrequisitos.map((pre) => (
                          <button 
                            key={pre.sigla}
                            onClick={() => openMateriaDetail(pre.sigla)}
                            className="bg-slate-100 hover:bg-primary hover:text-white text-slate-700 text-xs font-bold px-3 py-2 rounded-md transition-colors flex items-center gap-2"
                          >
                            {pre.sigla} <ArrowRight size={12} />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium bg-emerald-50 px-3 py-2 rounded-md">
                        <CheckCircle2 size={16} /> Sin prerrequisitos
                      </div>
                    )}
                  </section>

                  <section>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                      Materias que Habilita
                    </h3>
                    {materiaDetail.habilitadas.length > 0 ? (
                      <div className="flex flex-col gap-2">
                        {materiaDetail.habilitadas.map((hab) => (
                          <div key={hab.sigla} className="bg-blue-50 border border-blue-100 px-4 py-3 rounded-lg flex justify-between items-center">
                            <div>
                              <div className="text-xs font-bold text-secondary">{hab.sigla}</div>
                              <div className="text-sm font-medium text-slate-800">{hab.nombre}</div>
                            </div>
                            <button 
                              onClick={() => openMateriaDetail(hab.sigla)}
                              className="text-secondary hover:bg-blue-100 p-2 rounded-full transition-colors"
                            >
                              <ArrowRight size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-sm italic">
                        Esta materia no es prerrequisito de ninguna otra.
                      </p>
                    )}
                  </section>

                </div>
              )}
            </div>
          </div>
        </div>
      )}

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

export default MallaCurricular;