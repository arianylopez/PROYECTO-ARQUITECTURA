using Microsoft.EntityFrameworkCore;
using PortalInfoSoftware.Application.Interfaces;
using PortalInfoSoftware.Domain.Entities;
using PortalInfoSoftware.Infrastructure.Persistence;

namespace PortalInfoSoftware.Infrastructure.Repositories
{
    public class DocentesRepository : IDocentesRepository
    {
        private readonly ApplicationDbContext _context;

        public DocentesRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Docente>> GetAllActiveAsync()
        {
            return await _context.Docentes
                .Where(d => d.IsActive)
                .OrderBy(d => d.Orden)
                .ToListAsync();
        }

        public async Task<Docente?> GetByIdAsync(Guid id)
        {
            return await _context.Docentes.FirstOrDefaultAsync(d => d.Id == id && d.IsActive);
        }

        public async Task<Docente> AddAsync(Docente docente)
        {
            await _context.Docentes.AddAsync(docente);
            await _context.SaveChangesAsync();
            return docente;
        }

        public async Task UpdateAsync(Docente docente)
        {
            _context.Docentes.Update(docente);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var docente = await _context.Docentes.FindAsync(id);
            if (docente != null)
            {
                docente.IsActive = false;
                _context.Docentes.Update(docente);
                await _context.SaveChangesAsync();
            }
        }
    }
}