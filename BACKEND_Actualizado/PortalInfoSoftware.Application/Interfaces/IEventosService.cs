using PortalInfoSoftware.Application.DTOs;

namespace PortalInfoSoftware.Application.Interfaces
{
    public interface IEventosService
    {
        Task<IEnumerable<EventoPublicoDTO>> ObtenerEventosFiltradosAsync(string filtro);
        Task<EventoPublicoDTO?> ObtenerEventoPorIdAsync(Guid id);
        Task<EventoPublicoDTO> CrearEventoAsync(EventoCreateDTO dto, Guid autorId);
        Task EliminarEventoAsync(Guid id);
    }
}