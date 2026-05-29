using Microsoft.EntityFrameworkCore;
using PlataformaWeb.API.Data;
using PlataformaWeb.API.Models;

namespace PlataformaWeb.API.Repositories
{
    public interface ICommunityRepository
    {
        Task<IEnumerable<Teacher>> GetActiveTeachersAsync();
        Task<IEnumerable<Alumni>> GetVisibleAlumniAsync();
    }

    public class CommunityRepository : ICommunityRepository
    {
        private readonly AppDbContext _context;

        public CommunityRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Teacher>> GetActiveTeachersAsync()
        {
            return await _context.Teachers
                .Include(t => t.TeacherSubjects)
                    .ThenInclude(ts => ts.Subject)
                .Where(t => t.IsActive)
                .OrderBy(t => t.LastName)
                .ToListAsync();
        }

        public async Task<IEnumerable<Alumni>> GetVisibleAlumniAsync()
        {
            return await _context.Alumni
                .Where(a => a.IsVisible)
                .OrderByDescending(a => a.GraduationYear)
                .ToListAsync();
        }
    }
}