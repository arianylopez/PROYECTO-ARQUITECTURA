using PortalInfoSoftware.Application.DTOs;
using PortalInfoSoftware.Application.Interfaces;
using PortalInfoSoftware.Domain.Entities;

namespace PortalInfoSoftware.Application.Services
{
    public class DocentesService : IDocentesService
    {
        private readonly IDocentesRepository _repository;

        public DocentesService(IDocentesRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<DocentePublicoDTO>> ObtenerDocentesPublicosAsync()
        {
            var docentes = await _repository.GetAllActiveAsync();
            return docentes.Select(d => new DocentePublicoDTO
            {
                Id = d.Id,
                NombreCompleto = $"{d.FirstName} {d.LastName}",
                Cargo = d.Cargo,
                PhotoUrl = d.PhotoUrl,
                LinkedinUrl = d.LinkedinUrl,
                Descripcion = d.Descripcion
            }).ToList();
        }

        public async Task<DocentePublicoDTO?> ObtenerDocentePorIdAsync(Guid id)
        {
            var d = await _repository.GetByIdAsync(id);
            if (d == null) return null;

            return new DocentePublicoDTO
            {
                Id = d.Id,
                NombreCompleto = $"{d.FirstName} {d.LastName}",
                Cargo = d.Cargo,
                PhotoUrl = d.PhotoUrl,
                LinkedinUrl = d.LinkedinUrl,
                Descripcion = d.Descripcion
            };
        }

        public async Task<DocentePublicoDTO> CrearDocenteAsync(DocenteCreateDTO dto)
        {
            var docente = new Docente
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Cargo = dto.Cargo,
                Descripcion = dto.Descripcion,
                PhotoUrl = dto.PhotoUrl,
                LinkedinUrl = dto.LinkedinUrl,
                EmailPersonal = dto.EmailPersonal,
                Telefono = dto.Telefono
            };

            var created = await _repository.AddAsync(docente);

            return new DocentePublicoDTO
            {
                Id = created.Id,
                NombreCompleto = $"{created.FirstName} {created.LastName}",
                Cargo = created.Cargo,
                PhotoUrl = created.PhotoUrl,
                LinkedinUrl = created.LinkedinUrl,
                Descripcion = created.Descripcion
            };
        }

        public async Task ActualizarDocenteAsync(Guid id, DocenteCreateDTO dto)
        {
            var docente = await _repository.GetByIdAsync(id);
            if (docente == null) throw new KeyNotFoundException();

            docente.FirstName = dto.FirstName;
            docente.LastName = dto.LastName;
            docente.Cargo = dto.Cargo;
            docente.Descripcion = dto.Descripcion;
            docente.PhotoUrl = dto.PhotoUrl;
            docente.LinkedinUrl = dto.LinkedinUrl;
            docente.EmailPersonal = dto.EmailPersonal;
            docente.Telefono = dto.Telefono;
            docente.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(docente);
        }

        public async Task EliminarDocenteAsync(Guid id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}