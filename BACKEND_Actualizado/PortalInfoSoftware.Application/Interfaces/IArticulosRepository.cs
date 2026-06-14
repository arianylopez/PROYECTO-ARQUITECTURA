using PortalInfoSoftware.Domain.Entities;

namespace PortalInfoSoftware.Application.Interfaces
{
    public interface IArticulosRepository
    {
        Task<IEnumerable<Articulo>> ObtenerPublicadosAsync(string? categoria);
        Task<IEnumerable<Articulo>> ObtenerPendientesAsync();
        Task<Articulo?> GetByIdAsync(Guid id);
        Task<Articulo> AddAsync(Articulo articulo);
        Task UpdateAsync(Articulo articulo);
        Task DeleteAsync(Guid id);
    }
}