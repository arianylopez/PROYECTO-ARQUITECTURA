using Microsoft.AspNetCore.Mvc;
using PlataformaWeb.API.DTOs.Security;
using PlataformaWeb.API.Services;

namespace PlataformaWeb.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthFacade _facade;

        public AuthController(IAuthFacade facade)
        {
            _facade = facade;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto loginDto)
        {
            var authResponse = await _facade.LoginAsync(loginDto);

            if (authResponse == null)
            {
                return Unauthorized(new { message = "Correo electrónico o contraseña incorrectos." });
            }

            return Ok(authResponse);
        }
    }
}