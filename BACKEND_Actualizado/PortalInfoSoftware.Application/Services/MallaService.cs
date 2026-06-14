using PortalInfoSoftware.Application.DTOs;
using PortalInfoSoftware.Application.Interfaces;

namespace PortalInfoSoftware.Application.Services
{
    public class MallaService : IMallaService
    {
        private readonly IMallaRepository _mallaRepository;

        public MallaService(IMallaRepository mallaRepository)
        {
            _mallaRepository = mallaRepository;
        }

        public async Task<IEnumerable<MateriaDTO>> ObtenerMallaCurricularAsync()
        {
            var materias = await _mallaRepository.ObtenerMallaCompletaAsync();

            return materias.Select(m => new MateriaDTO
            {
                Sigla = m.Sigla,
                Nombre = m.Nombre,
                Semestre = m.Semestre,
                Creditos = m.Creditos
            }).ToList();
        }

        public async Task<MateriaDetalleDTO?> ObtenerDetalleMateriaAsync(string sigla)
        {
            var materia = await _mallaRepository.ObtenerMateriaPorSiglaConPrerrequisitosAsync(sigla);

            if (materia == null) return null;

            return new MateriaDetalleDTO
            {
                Sigla = materia.Sigla,
                Nombre = materia.Nombre,
                Semestre = materia.Semestre,
                Descripcion = materia.Descripcion,
                Objetivos = materia.Objetivos,
                Contenidos = materia.Contenidos,
                Prerrequisitos = materia.Prerrequisitos.Select(mp => new MateriaDTO
                {
                    Sigla = mp.Prerrequisito.Sigla,
                    Nombre = mp.Prerrequisito.Nombre,
                    Semestre = mp.Prerrequisito.Semestre,
                    Creditos = mp.Prerrequisito.Creditos
                }).ToList(),
                Habilitadas = materia.Habilitadas.Select(mp => new MateriaDTO
                {
                    Sigla = mp.Materia.Sigla,
                    Nombre = mp.Materia.Nombre,
                    Semestre = mp.Materia.Semestre,
                    Creditos = mp.Materia.Creditos
                }).ToList()
            };
        }
    }
}