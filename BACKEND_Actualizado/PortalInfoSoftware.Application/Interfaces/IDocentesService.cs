using PortalInfoSoftware.Application.DTOs;

namespace PortalInfoSoftware.Application.Interfaces
{
    public interface IDocentesService
    {
        Task<IEnumerable<DocentePublicoDTO>> ObtenerDocentesPublicosAsync();
        Task<DocentePublicoDTO?> ObtenerDocentePorIdAsync(Guid id);
        Task<DocentePublicoDTO> CrearDocenteAsync(DocenteCreateDTO dto);
        Task ActualizarDocenteAsync(Guid id, DocenteCreateDTO dto);
        Task EliminarDocenteAsync(Guid id);
    }
}