using PortalInfoSoftware.Domain.Entities;

namespace PortalInfoSoftware.Application.Interfaces
{
    public interface IVidaEstudiantilRepository
    {
        Task<IEnumerable<ImagenGaleria>> GetImagenesAsync();
        Task<ImagenGaleria?> GetImagenByIdAsync(Guid id);
        Task<ImagenGaleria> AddImagenAsync(ImagenGaleria imagen);
        Task DeleteImagenAsync(Guid id);

        Task<IEnumerable<RelatoEstudiantil>> GetRelatosAsync();
        Task<RelatoEstudiantil?> GetRelatoByIdAsync(Guid id);
        Task<RelatoEstudiantil> AddRelatoAsync(RelatoEstudiantil relato);
        Task UpdateRelatoAsync(RelatoEstudiantil relato);
        Task DeleteRelatoAsync(Guid id);
    }
}