using Microsoft.EntityFrameworkCore;
using PlataformaWeb.API.Data;
using PlataformaWeb.API.Models;

namespace PlataformaWeb.API.Repositories
{
    public interface IAsignaturaRepository
    {
        Task<IEnumerable<Subject>> GetAllSubjectsAsync();
        Task<Subject?> GetSubjectByCodeAsync(string code);
    }

    public class AsignaturaRepository : IAsignaturaRepository
    {
        private readonly AppDbContext _context;

        public AsignaturaRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Subject>> GetAllSubjectsAsync()
        {
            return await _context.Subjects
                .Include(s => s.Semester)
                .OrderBy(s => s.Semester!.Number)
                .ToListAsync();
        }

        public async Task<Subject?> GetSubjectByCodeAsync(string code)
        {
            return await _context.Subjects
                .Include(s => s.Semester)
                .Include(s => s.Requires)
                    .ThenInclude(req => req.Prerequisite)
                .FirstOrDefaultAsync(s => s.Code == code);
        }
    }
}