using Microsoft.EntityFrameworkCore;
using PortalInfoSoftware.Application.Interfaces;
using PortalInfoSoftware.Domain.Entities;
using PortalInfoSoftware.Infrastructure.Persistence;

namespace PortalInfoSoftware.Infrastructure.Repositories
{
    public class MallaRepository : IMallaRepository
    {
        private readonly ApplicationDbContext _context;

        public MallaRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Materia>> ObtenerMallaCompletaAsync()
        {
            return await _context.Materias
                .Where(m => m.IsActive)
                .OrderBy(m => m.Semestre)
                .ToListAsync();
        }

        public async Task<Materia?> ObtenerMateriaPorSiglaConPrerrequisitosAsync(string sigla)
        {
            return await _context.Materias
                .Include(m => m.Prerrequisitos)
                    .ThenInclude(mp => mp.Prerrequisito)
                .Include(m => m.Habilitadas)
                    .ThenInclude(mp => mp.Materia)
                .AsSplitQuery() 
                .FirstOrDefaultAsync(m => m.Sigla == sigla && m.IsActive);
        }
    }
}