using PortalInfoSoftware.Application.DTOs;

namespace PortalInfoSoftware.Application.Interfaces
{
    public interface IVidaEstudiantilService
    {
        Task<IEnumerable<ImagenGaleriaDTO>> ObtenerGaleriaAsync();
        Task<ImagenGaleriaDTO> AgregarImagenAsync(ImagenGaleriaCreateDTO dto);
        Task EliminarImagenAsync(Guid id);

        Task<IEnumerable<RelatoEstudiantilDTO>> ObtenerRelatosAsync();
        Task<RelatoEstudiantilDTO> AgregarRelatoAsync(RelatoEstudiantilCreateDTO dto);
        Task ActualizarRelatoAsync(Guid id, RelatoEstudiantilCreateDTO dto);
        Task EliminarRelatoAsync(Guid id);
    }
}