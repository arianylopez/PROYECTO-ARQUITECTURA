using PortalInfoSoftware.Application.DTOs;
using PortalInfoSoftware.Application.Interfaces;
using PortalInfoSoftware.Domain.Entities;

namespace PortalInfoSoftware.Application.Services
{
    public class InformacionService : IInformacionService
    {
        private readonly IInformacionRepository _repository;

        public InformacionService(IInformacionRepository repository)
        {
            _repository = repository;
        }

        public async Task<InformacionCarreraDTO> ObtenerInformacionAsync()
        {
            var info = await _repository.GetInformacionAsync();
            if (info == null) return new InformacionCarreraDTO();

            return new InformacionCarreraDTO
            {
                Descripcion = info.Descripcion,
                Objetivos = info.Objetivos,
                PerfilEgresado = info.PerfilEgresado,
                CampoLaboral = info.CampoLaboral,
                Competencias = info.Competencias
            };
        }

        public async Task ActualizarInformacionAsync(InformacionCarreraDTO dto)
        {
            var info = new InformacionCarrera
            {
                Descripcion = dto.Descripcion,
                Objetivos = dto.Objetivos,
                PerfilEgresado = dto.PerfilEgresado,
                CampoLaboral = dto.CampoLaboral,
                Competencias = dto.Competencias
            };

            await _repository.UpdateInformacionAsync(info);
        }

        public async Task<IEnumerable<AreaEspecializacionDTO>> ObtenerAreasAsync()
        {
            var areas = await _repository.GetAreasAsync();
            return areas.Select(a => new AreaEspecializacionDTO
            {
                Id = a.Id,
                Nombre = a.Nombre,
                Descripcion = a.Descripcion,
                ImageUrl = a.ImageUrl,
                Tecnologias = a.Tecnologias,
                OportunidadesLaborales = a.OportunidadesLaborales
            }).ToList();
        }

        public async Task<AreaEspecializacionDTO?> ObtenerAreaPorIdAsync(Guid id)
        {
            var a = await _repository.GetAreaByIdAsync(id);
            if (a == null) return null;

            return new AreaEspecializacionDTO
            {
                Id = a.Id,
                Nombre = a.Nombre,
                Descripcion = a.Descripcion,
                ImageUrl = a.ImageUrl,
                Tecnologias = a.Tecnologias,
                OportunidadesLaborales = a.OportunidadesLaborales
            };
        }

        public async Task<AreaEspecializacionDTO> CrearAreaAsync(AreaEspecializacionCreateDTO dto)
        {
            var area = new AreaEspecializacion
            {
                Nombre = dto.Nombre,
                Descripcion = dto.Descripcion,
                ImageUrl = dto.ImageUrl,
                Tecnologias = dto.Tecnologias,
                OportunidadesLaborales = dto.OportunidadesLaborales
            };

            var created = await _repository.AddAreaAsync(area);

            return new AreaEspecializacionDTO
            {
                Id = created.Id,
                Nombre = created.Nombre,
                Descripcion = created.Descripcion,
                ImageUrl = created.ImageUrl,
                Tecnologias = created.Tecnologias,
                OportunidadesLaborales = created.OportunidadesLaborales
            };
        }

        public async Task ActualizarAreaAsync(Guid id, AreaEspecializacionCreateDTO dto)
        {
            var area = await _repository.GetAreaByIdAsync(id);
            if (area == null) throw new KeyNotFoundException();

            area.Nombre = dto.Nombre;
            area.Descripcion = dto.Descripcion;
            area.ImageUrl = dto.ImageUrl;
            area.Tecnologias = dto.Tecnologias;
            area.OportunidadesLaborales = dto.OportunidadesLaborales;
            area.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateAreaAsync(area);
        }

        public async Task EliminarAreaAsync(Guid id)
        {
            await _repository.DeleteAreaAsync(id);
        }
    }
}