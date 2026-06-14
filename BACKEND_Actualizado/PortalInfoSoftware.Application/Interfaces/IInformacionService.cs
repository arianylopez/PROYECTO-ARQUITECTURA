using PortalInfoSoftware.Application.DTOs;

namespace PortalInfoSoftware.Application.Interfaces
{
    public interface IInformacionService
    {
        Task<InformacionCarreraDTO> ObtenerInformacionAsync();
        Task ActualizarInformacionAsync(InformacionCarreraDTO dto);

        Task<IEnumerable<AreaEspecializacionDTO>> ObtenerAreasAsync();
        Task<AreaEspecializacionDTO?> ObtenerAreaPorIdAsync(Guid id);
        Task<AreaEspecializacionDTO> CrearAreaAsync(AreaEspecializacionCreateDTO dto);
        Task ActualizarAreaAsync(Guid id, AreaEspecializacionCreateDTO dto);
        Task EliminarAreaAsync(Guid id);
    }
}