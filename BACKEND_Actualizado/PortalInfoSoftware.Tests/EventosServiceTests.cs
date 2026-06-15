using Moq;
using NUnit.Framework;
using PortalInfoSoftware.Application.Services;
using PortalInfoSoftware.Application.Interfaces;
using PortalInfoSoftware.Application.DTOs;
using PortalInfoSoftware.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace PortalInfoSoftware.Tests
{
    [TestFixture]
    public class EventosServiceTests
    {
        private Mock<IEventosRepository> _eventosRepositoryMock;
        private EventosService _eventosService;

        [SetUp]
        public void Setup()
        {
            _eventosRepositoryMock = new Mock<IEventosRepository>();
            _eventosService = new EventosService(_eventosRepositoryMock.Object);
        }

        [Test]
        public async Task CrearEventoAsync_DatosValidos_LlamaAlRepositorioUnaVezYRetornaDTO()
        {
            // Arrange
            var dto = new EventoCreateDTO
            {
                Titulo = "Hackathon UCB",
                Descripcion = "Evento de programación",
                Categoria = "Hackathon",
                FechaInicio = DateTime.UtcNow.AddDays(1),
                FechaFin = DateTime.UtcNow.AddDays(2),
                Lugar = "Campus UCB"
            };
            var autorId = Guid.NewGuid();
            var eventoIdSimulado = Guid.NewGuid();

            _eventosRepositoryMock.Setup(x => x.AddAsync(It.IsAny<Evento>()))
                .ReturnsAsync((Evento e) =>
                {
                    e.Id = eventoIdSimulado;
                    return e;
                });

            // Act
            var result = await _eventosService.CrearEventoAsync(dto, autorId);

            // Assert
            _eventosRepositoryMock.Verify(x => x.AddAsync(It.Is<Evento>(e =>
                e.Titulo == "Hackathon UCB" &&
                e.Categoria == "Hackathon" &&
                e.AutorId == autorId
            )), Times.Once);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Titulo, Is.EqualTo("Hackathon UCB"));
            Assert.That(result.Id, Is.EqualTo(eventoIdSimulado));
        }
    }
}