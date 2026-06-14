using PortalInfoSoftware.Application.DTOs;
using PortalInfoSoftware.Application.Interfaces;
using PortalInfoSoftware.Domain.Entities;

namespace PortalInfoSoftware.Application.Services
{
    public class VidaEstudiantilService : IVidaEstudiantilService
    {
        private readonly IVidaEstudiantilRepository _repository;

        public VidaEstudiantilService(IVidaEstudiantilRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ImagenGaleriaDTO>> ObtenerGaleriaAsync()
        {
            var imagenes = await _repository.GetImagenesAsync();
            return imagenes.Select(i => new ImagenGaleriaDTO
            {
                Id = i.Id,
                ImageUrl = i.ImageUrl,
                Descripcion = i.Descripcion,
                ActividadAsociada = i.ActividadAsociada
            }).ToList();
        }

        public async Task<ImagenGaleriaDTO> AgregarImagenAsync(ImagenGaleriaCreateDTO dto)
        {
            var imagen = new ImagenGaleria
            {
                ImageUrl = dto.ImageUrl,
                Descripcion = dto.Descripcion,
                ActividadAsociada = dto.ActividadAsociada
            };

            var created = await _repository.AddImagenAsync(imagen);

            return new ImagenGaleriaDTO
            {
                Id = created.Id,
                ImageUrl = created.ImageUrl,
                Descripcion = created.Descripcion,
                ActividadAsociada = created.ActividadAsociada
            };
        }

        public async Task EliminarImagenAsync(Guid id)
        {
            await _repository.DeleteImagenAsync(id);
        }

        public async Task<IEnumerable<RelatoEstudiantilDTO>> ObtenerRelatosAsync()
        {
            var relatos = await _repository.GetRelatosAsync();
            return relatos.Select(r => new RelatoEstudiantilDTO
            {
                Id = r.Id,
                NombreEstudiante = r.NombreEstudiante,
                Experiencia = r.Experiencia,
                ActividadRelacionada = r.ActividadRelacionada,
                FotoUrl = r.FotoUrl
            }).ToList();
        }

        public async Task<RelatoEstudiantilDTO> AgregarRelatoAsync(RelatoEstudiantilCreateDTO dto)
        {
            var relato = new RelatoEstudiantil
            {
                NombreEstudiante = dto.NombreEstudiante,
                Experiencia = dto.Experiencia,
                ActividadRelacionada = dto.ActividadRelacionada,
                FotoUrl = dto.FotoUrl
            };

            var created = await _repository.AddRelatoAsync(relato);

            return new RelatoEstudiantilDTO
            {
                Id = created.Id,
                NombreEstudiante = created.NombreEstudiante,
                Experiencia = created.Experiencia,
                ActividadRelacionada = created.ActividadRelacionada,
                FotoUrl = created.FotoUrl
            };
        }

        public async Task ActualizarRelatoAsync(Guid id, RelatoEstudiantilCreateDTO dto)
        {
            var relato = await _repository.GetRelatoByIdAsync(id);
            if (relato == null) throw new KeyNotFoundException();

            relato.NombreEstudiante = dto.NombreEstudiante;
            relato.Experiencia = dto.Experiencia;
            relato.ActividadRelacionada = dto.ActividadRelacionada;
            relato.FotoUrl = dto.FotoUrl;
            relato.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateRelatoAsync(relato);
        }

        public async Task EliminarRelatoAsync(Guid id)
        {
            await _repository.DeleteRelatoAsync(id);
        }
    }
}