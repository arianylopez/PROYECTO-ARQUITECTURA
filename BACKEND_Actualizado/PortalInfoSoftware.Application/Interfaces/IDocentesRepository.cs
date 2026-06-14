using PortalInfoSoftware.Domain.Entities;

namespace PortalInfoSoftware.Application.Interfaces
{
    public interface IDocentesRepository
    {
        Task<IEnumerable<Docente>> GetAllActiveAsync();
        Task<Docente?> GetByIdAsync(Guid id);
        Task<Docente> AddAsync(Docente docente);
        Task UpdateAsync(Docente docente);
        Task DeleteAsync(Guid id);
    }
}