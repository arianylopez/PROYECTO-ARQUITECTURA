using PortalInfoSoftware.Application.DTOs;

namespace PortalInfoSoftware.Application.Interfaces
{
    public interface IMallaService
    {
        Task<IEnumerable<MateriaDTO>> ObtenerMallaCurricularAsync();
        Task<MateriaDetalleDTO?> ObtenerDetalleMateriaAsync(string sigla);
    }
}