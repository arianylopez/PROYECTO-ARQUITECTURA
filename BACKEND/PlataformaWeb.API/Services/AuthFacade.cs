using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using PlataformaWeb.API.DTOs.Security;
using PlataformaWeb.API.Repositories;
using BCrypt.Net;

namespace PlataformaWeb.API.Services
{
    public interface IAuthFacade
    {
        Task<AuthResponseDto?> LoginAsync(LoginDto loginDto);
    }

    public class AuthFacade : IAuthFacade
    {
        private readonly IUserRepository _repository;
        private readonly IConfiguration _configuration;

        public AuthFacade(IUserRepository repository, IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
        }

        public async Task<AuthResponseDto?> LoginAsync(LoginDto loginDto)
        {
            var user = await _repository.GetUserByEmailAsync(loginDto.Email);

            // CHISMOSO 1: ¿Encontró al usuario?
            if (user == null)
            {
                Console.WriteLine($"\n[DEBUG] NO SE ENCONTRÓ EL USUARIO: {loginDto.Email}\n");
                return null;
            }

            Console.WriteLine($"\n[DEBUG] USUARIO ENCONTRADO. Hash en BD: {user.PasswordHash}\n");

            // CHISMOSO 2: ¿Coincide la contraseña?
            Console.WriteLine($"\n[DEBUG] CONTRASEÑA RECIBIDA DEL FRONTEND: {loginDto.Password}");

            // ESTA LÍNEA ES LA CLAVE: Generamos el hash real en vivo
            var hashReal = BCrypt.Net.BCrypt.HashPassword(loginDto.Password);
            Console.WriteLine($"[DEBUG] EL HASH REAL QUE DEBE IR EN LA BD ES: {hashReal}\n");

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash);

            if (!isValidPassword)
            {
                Console.WriteLine("\n[DEBUG] LA CONTRASEÑA NO COINCIDE CON EL HASH\n");
                return null;
            }

            Console.WriteLine("\n[DEBUG] ¡LOGIN EXITOSO! Generando Token...\n");

            var token = GenerateJwtToken(user);

            return new AuthResponseDto
            {
                Token = token,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role?.Name ?? "Admin"
            };
        }

        private string GenerateJwtToken(Models.User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role?.Name ?? "Admin")
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(8), 
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}