using PortalInfoSoftware.Domain.Entities;

namespace PortalInfoSoftware.Application.Interfaces
{
    public interface IAuthRepository
    {
        Task<Administrador?> GetByEmailAsync(string email);
    }
}
