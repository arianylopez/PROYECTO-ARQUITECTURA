using PortalInfoSoftware.Application.DTOs;

namespace PortalInfoSoftware.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDTO?> AutenticarAsync(LoginRequestDTO request);
    }
}