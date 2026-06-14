using PortalInfoSoftware.Application.DTOs;

namespace PortalInfoSoftware.Application.Interfaces
{
    public interface IArticulosService
    {
        Task<IEnumerable<ArticuloPublicoDTO>> ObtenerArticulosPublicadosAsync(string? categoria);
        Task<IEnumerable<ArticuloPublicoDTO>> ObtenerArticulosPendientesAsync();
        Task<ArticuloPublicoDTO?> ObtenerArticuloPorIdAsync(Guid id);
        Task<ArticuloPublicoDTO> EnviarArticuloAsync(ArticuloCreateDTO dto);
        Task CambiarEstadoArticuloAsync(Guid id, ArticuloEstadoDTO dto);
        Task EliminarArticuloAsync(Guid id);
    }
}