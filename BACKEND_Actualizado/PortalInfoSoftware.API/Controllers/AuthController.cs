using Microsoft.AspNetCore.Mvc;
using PortalInfoSoftware.Application.DTOs;
using PortalInfoSoftware.Application.Interfaces;

namespace PortalInfoSoftware.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDTO>> Login([FromBody] LoginRequestDTO request)
        {
            var response = await _authService.AutenticarAsync(request);

            if (response == null)
            {
                return Unauthorized(new { mensaje = "Credenciales inválidas" });
            }

            return Ok(response);
        }
    }
}