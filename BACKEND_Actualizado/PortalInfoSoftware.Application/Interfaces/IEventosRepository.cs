using PortalInfoSoftware.Domain.Entities;
using PortalInfoSoftware.Application.Strategies;

namespace PortalInfoSoftware.Application.Interfaces
{
    public interface IEventosRepository
    {
        Task<IEnumerable<Evento>> ObtenerEventosConEstrategiaAsync(IEventFilterStrategy strategy);
        Task<Evento?> GetByIdAsync(Guid id);
        Task<Evento> AddAsync(Evento evento);
        Task UpdateAsync(Evento evento);
        Task DeleteAsync(Guid id);
    }
}