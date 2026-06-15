using Moq;
using NUnit.Framework;
using Microsoft.Extensions.Configuration;
using PortalInfoSoftware.Application.Services;
using PortalInfoSoftware.Application.Interfaces;
using PortalInfoSoftware.Application.DTOs;
using PortalInfoSoftware.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace PortalInfoSoftware.Tests
{
    [TestFixture]
    public class AuthServiceTests
    {
        private Mock<IAuthRepository> _authRepositoryMock;
        private Mock<IConfiguration> _configurationMock;
        private AuthService _authService;

        [SetUp]
        public void Setup()
        {
            _authRepositoryMock = new Mock<IAuthRepository>();
            _configurationMock = new Mock<IConfiguration>();

            _configurationMock.Setup(x => x["Jwt:Key"]).Returns("EstaEsUnaClaveSuperSecretaParaLasPruebasUnitarias123!");
            _configurationMock.Setup(x => x["Jwt:Issuer"]).Returns("PortalSoftwareUCB");
            _configurationMock.Setup(x => x["Jwt:Audience"]).Returns("PortalSoftwareUCB_Users");

            _authService = new AuthService(_authRepositoryMock.Object, _configurationMock.Object);
        }

        [Test]
        public async Task AutenticarAsync_CredencialesValidas_RetornaAuthResponseDTO()
        {
            // Arrange
            var request = new LoginRequestDTO { Email = "admin@ucb.edu.bo", Password = "Password123" };
            var admin = new Administrador
            {
                Id = Guid.NewGuid(),
                Email = "admin@ucb.edu.bo",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123"),
                FirstName = "Admin",
                LastName = "Prueba",
                IsActive = true
            };

            _authRepositoryMock.Setup(x => x.GetByEmailAsync(request.Email)).ReturnsAsync(admin);

            // Act 
            var result = await _authService.AutenticarAsync(request);

            // Assert 
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Token, Is.Not.Empty);
            Assert.That(result.FirstName, Is.EqualTo("Admin"));
        }

        [Test]
        public async Task AutenticarAsync_EmailIncorrecto_RetornaNull()
        {
            // Arrange
            var request = new LoginRequestDTO { Email = "falso@ucb.edu.bo", Password = "Password123" };
            _authRepositoryMock.Setup(x => x.GetByEmailAsync(request.Email)).ReturnsAsync((Administrador)null);

            // Act 
            var result = await _authService.AutenticarAsync(request);

            // Assert 
            Assert.That(result, Is.Null);
        }
    }
}