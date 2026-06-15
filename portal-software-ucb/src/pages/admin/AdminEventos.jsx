import { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, MapPin, X, UploadCloud, Link as LinkIcon, Pencil, ExternalLink } from 'lucide-react';
import { api } from '../../api/axiosConfig';

const AdminEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [imageMode, setImageMode] = useState('url'); 
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    titulo: '', descripcion: '', categoria: '', lugar: '', 
    imageUrl: '', inscripcionUrl: '', maxParticipantes: '', 
    fechaInicio: '', fechaFin: ''
  });

  const fetchEventos = async () => {
    setLoading(true);
    try {
      const response = await api.get('/Eventos?filtro=proximos');
      setEventos(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  const handleEdit = (evento) => {
    setFormData({
      titulo: evento.titulo || '',
      descripcion: evento.descripcion || '',
      categoria: evento.categoria || '',
      lugar: evento.lugar || '',
      imageUrl: evento.imageUrl || '',
      inscripcionUrl: evento.inscripcionUrl || '',
      maxParticipantes: evento.maxParticipantes || '',
      fechaInicio: evento.fechaInicio ? new Date(evento.fechaInicio).toISOString().slice(0, 16) : '',
      fechaFin: evento.fechaFin ? new Date(evento.fechaFin).toISOString().slice(0, 16) : ''
    });
    setImageMode('url');
    setEditingId(evento.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      titulo: '', descripcion: '', categoria: '', lugar: '', 
      imageUrl: '', inscripcionUrl: '', maxParticipantes: '', 
      fechaInicio: '', fechaFin: ''
    });
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

      const payload = {
        ...formData,
        imageUrl: finalImageUrl,
        maxParticipantes: formData.maxParticipantes ? parseInt(formData.maxParticipantes) : null
      };

      if (editingId) {
        await api.put(`/Eventos/${editingId}`, payload);
      } else {
        await api.post('/Eventos', payload);
      }
      
      resetForm();
      fetchEventos();
    } catch (error) {
      alert('Error al guardar el evento: ' + (error.response?.data?.mensaje || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este evento?')) {
      try {
        await api.delete(`/Eventos/${id}`);
        fetchEventos();
      } catch (error) {
        alert('Error al eliminar');
      }
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary">Gestión de Eventos</h1>
          <p className="text-slate-600 mt-1">Administra la cartelera de actividades de la carrera.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="bg-primary text-white px-4 py-2 font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:bg-blue-900 transition-colors"
        >
          {showForm ? <><X size={18} /> Cancelar</> : <><Plus size={18} /> Nuevo Evento</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 border-t-4 border-accent shadow-xl mb-8 animate-slide-in-right">
          <h2 className="text-xl font-display font-bold text-primary mb-4">
            {editingId ? 'Editar Evento' : 'Crear Nuevo Evento'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-1">Título del Evento</label>
              <input type="text" name="titulo" value={formData.titulo} onChange={handleInputChange} required className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary" />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-1">Descripción</label>
              <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} required rows="3" className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Categoría</label>
              <select name="categoria" value={formData.categoria} onChange={handleInputChange} required className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary">
                <option value="">Selecciona una...</option>
                <option value="Conferencia">Conferencia</option>
                <option value="Taller">Taller</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Webinar">Webinar</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Lugar</label>
              <input type="text" name="lugar" value={formData.lugar} onChange={handleInputChange} required className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Fecha de Inicio</label>
              <input type="datetime-local" name="fechaInicio" value={formData.fechaInicio} onChange={handleInputChange} required className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Fecha de Fin</label>
              <input type="datetime-local" name="fechaFin" value={formData.fechaFin} onChange={handleInputChange} required className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary" />
            </div>

            <div className="col-span-1 md:col-span-2 bg-slate-50 p-4 border border-slate-200 mt-2">
              <label className="block text-sm font-bold text-primary mb-3">Imagen del Evento (Opcional)</label>
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
                <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="https://ejemplo.com/imagen.jpg" className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary" />
              ) : (
                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border border-slate-300 bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-blue-900 cursor-pointer" />
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">URL de Inscripción (Opcional)</label>
              <input type="url" name="inscripcionUrl" value={formData.inscripcionUrl} onChange={handleInputChange} className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Máximo Participantes (Opcional)</label>
              <input type="number" name="maxParticipantes" value={formData.maxParticipantes || ''} onChange={handleInputChange} className="w-full p-2 border border-slate-300 focus:outline-none focus:border-primary" />
            </div>
            
            <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
              <button type="submit" className="bg-accent text-primary px-6 py-2 font-bold uppercase tracking-wider hover:bg-yellow-500 transition-colors">
                {editingId ? 'Actualizar Evento' : 'Guardar Evento'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="animate-pulse h-64 bg-slate-200 w-full rounded"></div>
      ) : (
        <div className="bg-white border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Evento</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {eventos.map((evento) => (
                <tr key={evento.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-primary">{evento.titulo}</div>
                    <div className="text-xs flex items-center gap-1 mt-1 text-slate-500">
                      <MapPin size={12} /> {evento.lugar}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-secondary px-2 py-1 text-xs font-bold rounded">
                      {evento.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" />
                      {new Date(evento.fechaInicio).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <a href={`/eventos/${evento.id}`} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-primary transition-colors" title="Visualizar página pública">
                        <ExternalLink size={18} />
                      </a>
                      <button onClick={() => handleEdit(evento)} className="p-2 text-slate-400 hover:text-blue-500 transition-colors" title="Editar">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDelete(evento.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Eliminar">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminEventos;