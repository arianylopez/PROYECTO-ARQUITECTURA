using PortalInfoSoftware.Domain.Entities;

namespace PortalInfoSoftware.Application.Interfaces
{
    public interface IInformacionRepository
    {
        Task<InformacionCarrera?> GetInformacionAsync();
        Task UpdateInformacionAsync(InformacionCarrera informacion);

        Task<IEnumerable<AreaEspecializacion>> GetAreasAsync();
        Task<AreaEspecializacion?> GetAreaByIdAsync(Guid id);
        Task<AreaEspecializacion> AddAreaAsync(AreaEspecializacion area);
        Task UpdateAreaAsync(AreaEspecializacion area);
        Task DeleteAreaAsync(Guid id);
    }
}