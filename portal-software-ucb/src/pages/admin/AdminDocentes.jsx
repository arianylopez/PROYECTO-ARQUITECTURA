import { useState, useEffect } from 'react';
import { Plus, Trash2, X, User, UploadCloud, Link as LinkIcon, Pencil, ExternalLink } from 'lucide-react';
import { api } from '../../api/axiosConfig';

const AdminDocentes = () => {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [imageMode, setImageMode] = useState('url');
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', cargo: '', descripcion: '', 
    photoUrl: '', linkedinUrl: '', emailPersonal: '', telefono: ''
  });

  const fetchDocentes = async () => {
    setLoading(true);
    try {
      const response = await api.get('/Docentes');
      setDocentes(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocentes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  const handleEdit = (docente) => {
    setFormData({
      firstName: docente.firstName || '',
      lastName: docente.lastName || '',
      cargo: docente.cargo || '',
      descripcion: docente.descripcion || '',
      photoUrl: docente.photoUrl || '',
      linkedinUrl: docente.linkedinUrl || '',
      emailPersonal: docente.emailPersonal || '',
      telefono: docente.telefono || ''
    });
    setImageMode('url');
    setEditingId(docente.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      firstName: '', lastName: '', cargo: '', descripcion: '', 
      photoUrl: '', linkedinUrl: '', emailPersonal: '', telefono: ''
    });
    setSelectedFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalPhotoUrl = formData.photoUrl;

      if (imageMode === 'file' && selectedFile) {
        const uploadData = new FormData();
        uploadData.append('file', selectedFile);
        const uploadResponse = await api.post('/Upload', uploadData, { headers: { 'Content-Type': 'multipart/form-data' } });
        finalPhotoUrl = uploadResponse.data.url;
      }

      const payload = { ...formData, photoUrl: finalPhotoUrl };

      if (editingId) {
        await api.put(`/Docentes/${editingId}`, payload);
      } else {
        await api.post('/Docentes', payload);
      }
      
      resetForm();
      fetchDocentes();
    } catch (error) {
      alert('Error al guardar el docente: ' + (error.response?.data?.mensaje || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este docente?')) {
      try {
        await api.delete(`/Docentes/${id}`);
        fetchDocentes();
      } catch (error) {
        alert('Error al eliminar');
      }
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary">Gestión de Docentes</h1>
          <p className="text-slate-600 mt-1">Administra el directorio del plantel académico.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="bg-primary text-white px-4 py-2 font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:bg-blue-900 transition-colors"
        >
          {showForm ? <><X size={18} /> Cancelar</> : <><Plus size={18} /> Nuevo Docente</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 border-t-4 border-accent shadow-xl mb-8 animate-slide-in-right">
          <h2 className="text-xl font-display font-bold text-primary mb-4">
            {editingId ? 'Editar Docente' : 'Añadir Docente'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Nombres</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Apellidos</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary" />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-1">Cargo / Especialidad</label>
              <input type="text" name="cargo" value={formData.cargo} onChange={handleInputChange} required placeholder="Ej: Especialista en Cloud Computing" className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary" />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-1">Biografía Corta</label>
              <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} required rows="2" className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary"></textarea>
            </div>

            <div className="col-span-1 md:col-span-2 bg-slate-50 p-4 border border-slate-200 mt-2">
              <label className="block text-sm font-bold text-primary mb-3">Fotografía (Opcional)</label>
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
                <input type="url" name="photoUrl" value={formData.photoUrl} onChange={handleInputChange} placeholder="https://ejemplo.com/foto.jpg" className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary" />
              ) : (
                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border border-slate-300 bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-blue-900 cursor-pointer" />
              )}
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-1">URL de LinkedIn (Opcional)</label>
              <input type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleInputChange} className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary" />
            </div>
            
            <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
              <button type="submit" className="bg-accent text-primary px-6 py-2 font-bold uppercase tracking-wider hover:bg-yellow-500 transition-colors">
                {editingId ? 'Actualizar Docente' : 'Guardar Docente'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-10 bg-slate-200 w-full"></div>
            <div className="h-10 bg-slate-200 w-full"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docentes.map((docente) => (
            <div key={docente.id} className="bg-white border border-slate-200 p-6 flex flex-col items-center text-center relative group">
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(docente)} className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow" title="Editar">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(docente.id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow" title="Eliminar">
                  <Trash2 size={14} />
                </button>
              </div>
              
              <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center mb-4 border-2 border-slate-100">
                {docente.photoUrl ? (
                  <img src={docente.photoUrl} alt={docente.nombreCompleto} className="w-full h-full object-cover" />
                ) : (
                  <User size={32} className="text-slate-300" />
                )}
              </div>
              <h3 className="font-display font-bold text-primary">{docente.nombreCompleto}</h3>
              <p className="text-sm text-slate-500 mb-4">{docente.cargo}</p>
              
              <a href="/docentes" target="_blank" rel="noreferrer" className="mt-auto flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-wider hover:text-secondary transition-colors">
                Ver en página <ExternalLink size={12} />
              </a>
            </div>
          ))}
          {docentes.length === 0 && (
            <div className="col-span-3 text-center py-12 bg-white border border-slate-200 text-slate-500">
              No hay docentes registrados.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDocentes;