import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, X, FileText, Clock, UploadCloud, Link as LinkIcon, Pencil, ExternalLink } from 'lucide-react';
import { api } from '../../api/axiosConfig';

const AdminArticulos = () => {
  const [pendientes, setPendientes] = useState([]);
  const [publicados, setPublicados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [imageMode, setImageMode] = useState('url');
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    titulo: '', autor: '', categoria: '', contenido: '', imageUrl: '', tiempoLectura: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pendientesRes, publicadosRes] = await Promise.all([
        api.get('/Articulos/pendientes'),
        api.get('/Articulos')
      ]);
      setPendientes(pendientesRes.data);
      setPublicados(publicadosRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  const handleEdit = (art) => {
    setFormData({
      titulo: art.titulo || '', autor: art.autor || '', categoria: art.categoria || '', 
      contenido: art.contenido || '', imageUrl: art.imageUrl || '', tiempoLectura: art.tiempoLectura || ''
    });
    setImageMode('url');
    setEditingId(art.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ titulo: '', autor: '', categoria: '', contenido: '', imageUrl: '', tiempoLectura: '' });
    setSelectedFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalImageUrl = formData.imageUrl;
      if (imageMode === 'file' && selectedFile) {
        const uploadData = new FormData();
        uploadData.append('file', selectedFile);
        const uploadResponse = await api.post('/Upload', uploadData, { headers: { 'Content-Type': 'multipart/form-data' } });
        finalImageUrl = uploadResponse.data.url;
      }

      const payload = { ...formData, imageUrl: finalImageUrl, tiempoLectura: parseInt(formData.tiempoLectura) };

      if (editingId) {
        await api.put(`/Articulos/${editingId}`, payload);
      } else {
        await api.post('/Articulos', payload);
      }
      
      resetForm();
      fetchData();
    } catch (error) {
      alert('Error al guardar: ' + (error.response?.data?.mensaje || error.message));
    }
  };

  const cambiarEstado = async (id, estado) => {
    try {
      await api.put(`/Articulos/${id}/estado`, { estado });
      fetchData();
    } catch (error) {
      alert('Error al cambiar estado');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este artículo?')) {
      try {
        await api.delete(`/Articulos/${id}`);
        fetchData();
      } catch (error) {
        alert('Error al eliminar');
      }
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary">Gestión de Artículos</h1>
          <p className="text-slate-600 mt-1">Administra las publicaciones del blog académico.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="bg-primary text-white px-4 py-2 font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:bg-blue-900 transition-colors"
        >
          {showForm ? <><X size={18} /> Cancelar</> : <><Plus size={18} /> Nuevo Artículo</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 border-t-4 border-accent shadow-xl mb-8 animate-slide-in-right">
          <h2 className="text-xl font-display font-bold text-primary mb-4">
            {editingId ? 'Editar Artículo' : 'Redactar Artículo'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-1">Título</label>
              <input type="text" name="titulo" value={formData.titulo} onChange={handleInputChange} required className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Autor</label>
              <input type="text" name="autor" value={formData.autor} onChange={handleInputChange} required className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Categoría</label>
              <input type="text" name="categoria" value={formData.categoria} onChange={handleInputChange} required className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary" />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-1">Contenido</label>
              <textarea name="contenido" value={formData.contenido} onChange={handleInputChange} required rows="5" className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary"></textarea>
            </div>

            <div className="col-span-1 md:col-span-2 bg-slate-50 p-4 border border-slate-200 mt-2">
              <label className="block text-sm font-bold text-primary mb-3">Imagen del Artículo (Opcional)</label>
              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="imageMode" value="url" checked={imageMode === 'url'} onChange={() => setImageMode('url')} className="accent-primary" />
                  <LinkIcon size={16} /> Pegar URL externa
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="imageMode" value="file" checked={imageMode === 'file'} onChange={() => setImageMode('file')} className="accent-primary" />
                  <UploadCloud size={16} /> Subir desde mi equipo
                </label>
              </div>

              {imageMode === 'url' ? (
                <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="https://ejemplo.com/portada.jpg" className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary" />
              ) : (
                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border border-slate-300 bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-blue-900 cursor-pointer" />
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Tiempo de Lectura (minutos)</label>
              <input type="number" name="tiempoLectura" value={formData.tiempoLectura} onChange={handleInputChange} required className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary" />
            </div>
            
            <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
              <button type="submit" className="bg-accent text-primary px-6 py-2 font-bold uppercase tracking-wider hover:bg-yellow-500 transition-colors">
                {editingId ? 'Actualizar Artículo' : 'Enviar Artículo'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="animate-pulse h-64 bg-slate-200 w-full rounded"></div>
      ) : (
        <div className="space-y-8">
          {pendientes.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-amber-600 mb-4 flex items-center gap-2">
                <Clock size={20} /> Artículos Pendientes de Aprobación
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {pendientes.map(art => (
                  <div key={art.id} className="bg-amber-50 border border-amber-200 p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      <h3 className="font-bold text-primary">{art.titulo}</h3>
                      <p className="text-sm text-slate-600">Por {art.autor} • {art.categoria}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => handleEdit(art)} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors" title="Editar">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => cambiarEstado(art.id, 'Publicado')} className="bg-emerald-500 text-white px-3 py-1 text-sm font-bold flex items-center gap-1 hover:bg-emerald-600">
                        <CheckCircle size={16} /> Aprobar
                      </button>
                      <button onClick={() => handleDelete(art.id)} className="bg-red-500 text-white px-3 py-1 text-sm font-bold flex items-center gap-1 hover:bg-red-600">
                        <Trash2 size={16} /> Rechazar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <FileText size={20} /> Artículos Publicados
            </h2>
            <div className="bg-white border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Título</th>
                    <th className="px-6 py-4">Autor</th>
                    <th className="px-6 py-4">Fecha</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {publicados.map((art) => (
                    <tr key={art.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-primary">{art.titulo}</td>
                      <td className="px-6 py-4">{art.autor}</td>
                      <td className="px-6 py-4">{new Date(art.fechaPublicacion).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <a href={`/blog/${art.id}`} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-primary transition-colors" title="Visualizar página pública">
                            <ExternalLink size={18} />
                          </a>
                          <button onClick={() => handleEdit(art)} className="p-2 text-slate-400 hover:text-blue-500 transition-colors" title="Editar">
                            <Pencil size={18} />
                          </button>
                          <button onClick={() => handleDelete(art.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Eliminar">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminArticulos;