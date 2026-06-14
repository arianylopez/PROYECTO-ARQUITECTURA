using PortalInfoSoftware.Domain.Entities;

namespace PortalInfoSoftware.Application.Interfaces
{
    public interface IMallaRepository
    {
        Task<IEnumerable<Materia>> ObtenerMallaCompletaAsync();
        Task<Materia?> ObtenerMateriaPorSiglaConPrerrequisitosAsync(string sigla);
    }
}