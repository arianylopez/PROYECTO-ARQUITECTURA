using PortalInfoSoftware.Application.DTOs;
using PortalInfoSoftware.Application.Factories;
using PortalInfoSoftware.Application.Interfaces;
using PortalInfoSoftware.Application.Strategies;

namespace PortalInfoSoftware.Application.Services
{
    public class EventosService : IEventosService
    {
        private readonly IEventosRepository _repository;

        public EventosService(IEventosRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<EventoPublicoDTO>> ObtenerEventosFiltradosAsync(string filtro)
        {
            IEventFilterStrategy strategy = filtro.ToLower() switch
            {
                "pasados" => new PastEventsStrategy(),
                _ => new UpcomingEventsStrategy()
            };

            var eventos = await _repository.ObtenerEventosConEstrategiaAsync(strategy);

            return eventos.Select(e => new EventoPublicoDTO
            {
                Id = e.Id,
                Titulo = e.Titulo,
                Descripcion = e.Descripcion,
                Categoria = e.Categoria,
                Estado = e.Estado,
                Lugar = e.Lugar,
                ImageUrl = e.ImageUrl,
                InscripcionUrl = e.InscripcionUrl,
                MaxParticipantes = e.MaxParticipantes,
                FechaInicio = e.FechaInicio,
                FechaFin = e.FechaFin
            }).ToList();
        }

        public async Task<EventoPublicoDTO?> ObtenerEventoPorIdAsync(Guid id)
        {
            var e = await _repository.GetByIdAsync(id);
            if (e == null) return null;

            return new EventoPublicoDTO
            {
                Id = e.Id,
                Titulo = e.Titulo,
                Descripcion = e.Descripcion,
                Categoria = e.Categoria,
                Estado = e.Estado,
                Lugar = e.Lugar,
                ImageUrl = e.ImageUrl,
                InscripcionUrl = e.InscripcionUrl,
                MaxParticipantes = e.MaxParticipantes,
                FechaInicio = e.FechaInicio,
                FechaFin = e.FechaFin
            };
        }

        public async Task<EventoPublicoDTO> CrearEventoAsync(EventoCreateDTO dto, Guid autorId)
        {
            var evento = PublicacionFactory.CrearEvento(dto, autorId);
            var created = await _repository.AddAsync(evento);

            return new EventoPublicoDTO
            {
                Id = created.Id,
                Titulo = created.Titulo,
                Descripcion = created.Descripcion,
                Categoria = created.Categoria,
                Estado = created.Estado,
                Lugar = created.Lugar,
                ImageUrl = created.ImageUrl,
                InscripcionUrl = created.InscripcionUrl,
                MaxParticipantes = created.MaxParticipantes,
                FechaInicio = created.FechaInicio,
                FechaFin = created.FechaFin
            };
        }

        public async Task EliminarEventoAsync(Guid id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task ActualizarEventoAsync(Guid id, EventoCreateDTO dto)
        {
            var evento = await _repository.GetByIdAsync(id);
            if (evento == null) throw new Exception("Evento no encontrado");

            evento.Titulo = dto.Titulo;
            evento.Descripcion = dto.Descripcion;
            evento.Categoria = dto.Categoria;
            evento.Lugar = dto.Lugar;

            evento.FechaInicio = DateTime.SpecifyKind(dto.FechaInicio, DateTimeKind.Utc);
            evento.FechaFin = DateTime.SpecifyKind(dto.FechaFin, DateTimeKind.Utc);

            evento.ImageUrl = dto.ImageUrl;
            evento.InscripcionUrl = dto.InscripcionUrl;
            evento.MaxParticipantes = dto.MaxParticipantes;
            evento.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(evento);
        }
    }
}