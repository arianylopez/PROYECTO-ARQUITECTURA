using PortalInfoSoftware.Application.DTOs;
using PortalInfoSoftware.Domain.Entities;

namespace PortalInfoSoftware.Application.Factories
{
    public static class PublicacionFactory
    {
        public static Evento CrearEvento(EventoCreateDTO dto, Guid autorId)
        {
            if (dto.FechaInicio >= dto.FechaFin)
            {
                throw new ArgumentException("La fecha de inicio debe ser anterior a la fecha de fin.");
            }

            return new Evento
            {
                AutorId = autorId,
                Titulo = dto.Titulo,
                Descripcion = dto.Descripcion,
                Categoria = dto.Categoria,
                Estado = dto.FechaInicio > DateTime.UtcNow ? "Próximo" : "En Curso",
                Lugar = dto.Lugar,
                ImageUrl = dto.ImageUrl,
                InscripcionUrl = dto.InscripcionUrl,
                MaxParticipantes = dto.MaxParticipantes,
                FechaInicio = dto.FechaInicio,
                FechaFin = dto.FechaFin,
                IsPublished = true
            };
        }
    }
}