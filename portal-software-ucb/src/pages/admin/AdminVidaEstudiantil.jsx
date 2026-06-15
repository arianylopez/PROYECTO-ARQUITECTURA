import { useState, useEffect } from 'react';
import { Trash2, Image as ImageIcon, Quote, UploadCloud, Link as LinkIcon, Pencil, X } from 'lucide-react';
import { api } from '../../api/axiosConfig';

const AdminVidaEstudiantil = () => {
  const [galeria, setGaleria] = useState([]);
  const [relatos, setRelatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('galeria');

  // Estados para la Galería (Sin modo de edición)
  const [imageModeGaleria, setImageModeGaleria] = useState('url');
  const [fileGaleria, setFileGaleria] = useState(null);
  const [formGaleria, setFormGaleria] = useState({ imageUrl: '', descripcion: '', actividadAsociada: '' });

  // Estados para los Relatos (Con modo de edición)
  const [editingRelatoId, setEditingRelatoId] = useState(null);
  const [imageModeRelato, setImageModeRelato] = useState('url');
  const [fileRelato, setFileRelato] = useState(null);
  const [formRelato, setFormRelato] = useState({ nombreEstudiante: '', experiencia: '', actividadRelacionada: '', fotoUrl: '' });

  const fetchData = async () => {
    setLoading(true);
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChangeGaleria = (e) => {
    if (e.target.files && e.target.files[0]) setFileGaleria(e.target.files[0]);
  };

  const handleFileChangeRelato = (e) => {
    if (e.target.files && e.target.files[0]) setFileRelato(e.target.files[0]);
  };

  const resetFormGaleria = () => {
    setFormGaleria({ imageUrl: '', descripcion: '', actividadAsociada: '' });
    setFileGaleria(null);
  };

  const handleEditRelato = (relato) => {
    setFormRelato({
      nombreEstudiante: relato.nombreEstudiante || '',
      experiencia: relato.experiencia || '',
      actividadRelacionada: relato.actividadRelacionada || '',
      fotoUrl: relato.fotoUrl || ''
    });
    setImageModeRelato('url');
    setEditingRelatoId(relato.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFormRelato = () => {
    setEditingRelatoId(null);
    setFormRelato({ nombreEstudiante: '', experiencia: '', actividadRelacionada: '', fotoUrl: '' });
    setFileRelato(null);
  };

  const handleGaleriaSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalImageUrl = formGaleria.imageUrl;

      if (imageModeGaleria === 'file' && fileGaleria) {
        const uploadData = new FormData();
        uploadData.append('file', fileGaleria);
        const uploadResponse = await api.post('/Upload', uploadData, { headers: { 'Content-Type': 'multipart/form-data' } });
        finalImageUrl = uploadResponse.data.url;
      }

      const payload = { ...formGaleria, imageUrl: finalImageUrl };

      await api.post('/VidaEstudiantil/galeria', payload);
      
      resetFormGaleria();
      fetchData();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleRelatoSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalFotoUrl = formRelato.fotoUrl;

      if (imageModeRelato === 'file' && fileRelato) {
        const uploadData = new FormData();
        uploadData.append('file', fileRelato);
        const uploadResponse = await api.post('/Upload', uploadData, { headers: { 'Content-Type': 'multipart/form-data' } });
        finalFotoUrl = uploadResponse.data.url;
      }

      const payload = { ...formRelato, fotoUrl: finalFotoUrl };

      if (editingRelatoId) {
        await api.put(`/VidaEstudiantil/relatos/${editingRelatoId}`, payload);
      } else {
        await api.post('/VidaEstudiantil/relatos', payload);
      }
      
      resetFormRelato();
      fetchData();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleDelete = async (type, id) => {
    if (window.confirm(`¿Eliminar este registro de ${type}?`)) {
      try {
        await api.delete(`/VidaEstudiantil/${type}/${id}`);
        fetchData();
      } catch (error) {
        alert('Error al eliminar');
      }
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary">Vida Estudiantil</h1>
          <p className="text-slate-600 mt-1">Gestiona la galería de imágenes y los testimonios de estudiantes.</p>
        </div>
      </div>

      <div className="flex border-b border-slate-200 mb-8">
        <button onClick={() => { setActiveTab('galeria'); resetFormRelato(); }} className={`flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-wider text-sm transition-colors ${activeTab === 'galeria' ? 'border-b-2 border-primary text-primary' : 'text-slate-500 hover:text-primary'}`}>
          <ImageIcon size={18} /> Galería Multimedia
        </button>
        <button onClick={() => { setActiveTab('relatos'); resetFormGaleria(); }} className={`flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-wider text-sm transition-colors ${activeTab === 'relatos' ? 'border-b-2 border-primary text-primary' : 'text-slate-500 hover:text-primary'}`}>
          <Quote size={18} /> Relatos Estudiantiles
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse h-64 bg-slate-200 w-full rounded"></div>
      ) : activeTab === 'galeria' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 border-t-4 border-accent shadow-lg h-fit relative">
            <h2 className="font-display font-bold text-primary mb-4 text-xl">
              Añadir Nueva Imagen
            </h2>
            <form onSubmit={handleGaleriaSubmit} className="space-y-4">
              <div className="bg-slate-50 p-3 border border-slate-200">
                <label className="block text-sm font-bold text-primary mb-2">Archivo de Imagen</label>
                <div className="flex flex-col gap-2 mb-3">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" name="imageModeGaleria" value="url" checked={imageModeGaleria === 'url'} onChange={() => setImageModeGaleria('url')} className="accent-primary" />
                    <LinkIcon size={14} /> URL externa
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" name="imageModeGaleria" value="file" checked={imageModeGaleria === 'file'} onChange={() => setImageModeGaleria('file')} className="accent-primary" />
                    <UploadCloud size={14} /> Subir desde mi equipo
                  </label>
                </div>
                {imageModeGaleria === 'url' ? (
                  <input type="url" value={formGaleria.imageUrl} onChange={(e) => setFormGaleria({...formGaleria, imageUrl: e.target.value})} placeholder="https://..." required={imageModeGaleria==='url'} className="w-full p-2 border border-slate-300 focus:border-primary outline-none text-sm" />
                ) : (
                  <input type="file" accept="image/*" onChange={handleFileChangeGaleria} required={imageModeGaleria==='file'} className="w-full text-sm border border-slate-300 bg-white file:mr-2 file:py-1 file:px-2 file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white cursor-pointer" />
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Descripción</label>
                <textarea value={formGaleria.descripcion} onChange={(e) => setFormGaleria({...formGaleria, descripcion: e.target.value})} required rows="2" className="w-full p-2 border border-slate-300 focus:border-primary outline-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Actividad Asociada</label>
                <input type="text" value={formGaleria.actividadAsociada} onChange={(e) => setFormGaleria({...formGaleria, actividadAsociada: e.target.value})} required className="w-full p-2 border border-slate-300 focus:border-primary outline-none" />
              </div>
              <button type="submit" className="w-full bg-primary text-white font-bold py-2 uppercase tracking-wide hover:bg-blue-900 transition-colors">
                Guardar Imagen
              </button>
            </form>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {galeria.map(img => (
              <div key={img.id} className="relative group overflow-hidden bg-slate-100 border border-slate-200">
                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleDelete('galeria', img.id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow" title="Eliminar Imagen">
                    <Trash2 size={14} />
                  </button>
                </div>
                <img src={img.imageUrl} alt={img.descripcion} className="w-full h-48 object-cover" />
                <div className="p-3 bg-white">
                  <div className="text-xs font-bold text-accent uppercase">{img.actividadAsociada}</div>
                  <div className="text-sm text-slate-600 truncate">{img.descripcion}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 border-t-4 border-accent shadow-lg h-fit relative">
            {editingRelatoId && (
              <button onClick={resetFormRelato} className="absolute top-4 right-4 text-slate-400 hover:text-primary"><X size={18} /></button>
            )}
            <h2 className="font-display font-bold text-primary mb-4 text-xl">
              {editingRelatoId ? 'Editar Relato' : 'Añadir Nuevo Relato'}
            </h2>
            <form onSubmit={handleRelatoSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nombre del Estudiante</label>
                <input type="text" value={formRelato.nombreEstudiante} onChange={(e) => setFormRelato({...formRelato, nombreEstudiante: e.target.value})} required className="w-full p-2 border border-slate-300 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Experiencia (Testimonio)</label>
                <textarea value={formRelato.experiencia} onChange={(e) => setFormRelato({...formRelato, experiencia: e.target.value})} required rows="3" className="w-full p-2 border border-slate-300 focus:border-primary outline-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Actividad Relacionada</label>
                <input type="text" value={formRelato.actividadRelacionada} onChange={(e) => setFormRelato({...formRelato, actividadRelacionada: e.target.value})} required className="w-full p-2 border border-slate-300 focus:border-primary outline-none" />
              </div>
              
              <div className="bg-slate-50 p-3 border border-slate-200">
                <label className="block text-sm font-bold text-primary mb-2">Foto (Opcional)</label>
                <div className="flex flex-col gap-2 mb-3">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" name="imageModeRelato" value="url" checked={imageModeRelato === 'url'} onChange={() => setImageModeRelato('url')} className="accent-primary" />
                    <LinkIcon size={14} /> URL externa
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" name="imageModeRelato" value="file" checked={imageModeRelato === 'file'} onChange={() => setImageModeRelato('file')} className="accent-primary" />
                    <UploadCloud size={14} /> Subir desde mi equipo
                  </label>
                </div>
                {imageModeRelato === 'url' ? (
                  <input type="url" value={formRelato.fotoUrl} onChange={(e) => setFormRelato({...formRelato, fotoUrl: e.target.value})} placeholder="https://..." className="w-full p-2 border border-slate-300 focus:border-primary outline-none text-sm" />
                ) : (
                  <input type="file" accept="image/*" onChange={handleFileChangeRelato} className="w-full text-sm border border-slate-300 bg-white file:mr-2 file:py-1 file:px-2 file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white cursor-pointer" />
                )}
              </div>

              <button type="submit" className="w-full bg-primary text-white font-bold py-2 uppercase tracking-wide hover:bg-blue-900 transition-colors">
                {editingRelatoId ? 'Actualizar Relato' : 'Guardar Relato'}
              </button>
            </form>
          </div>
          <div className="lg:col-span-2 space-y-4">
            {relatos.map(relato => (
              <div key={relato.id} className="bg-white p-6 border border-slate-200 flex justify-between gap-4 group">
                <div>
                  <div className="font-bold text-primary mb-1">{relato.nombreEstudiante} <span className="text-xs text-slate-400 font-normal ml-2">{relato.actividadRelacionada}</span></div>
                  <p className="text-sm text-slate-600 italic">"{relato.experiencia}"</p>
                </div>
                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEditRelato(relato)} className="text-blue-500 hover:text-blue-700 h-fit p-1" title="Editar">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => handleDelete('relatos', relato.id)} className="text-red-500 hover:text-red-700 h-fit p-1" title="Eliminar">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVidaEstudiantil;