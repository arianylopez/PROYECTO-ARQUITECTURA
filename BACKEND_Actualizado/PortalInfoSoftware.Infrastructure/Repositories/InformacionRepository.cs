using Microsoft.EntityFrameworkCore;
using PortalInfoSoftware.Application.Interfaces;
using PortalInfoSoftware.Domain.Entities;
using PortalInfoSoftware.Infrastructure.Persistence;

namespace PortalInfoSoftware.Infrastructure.Repositories
{
    public class InformacionRepository : IInformacionRepository
    {
        private readonly ApplicationDbContext _context;

        public InformacionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<InformacionCarrera?> GetInformacionAsync()
        {
            return await _context.InformacionCarrera.FirstOrDefaultAsync();
        }

        public async Task UpdateInformacionAsync(InformacionCarrera informacion)
        {
            var existing = await _context.InformacionCarrera.FirstOrDefaultAsync();
            if (existing == null)
            {
                await _context.InformacionCarrera.AddAsync(informacion);
            }
            else
            {
                existing.Descripcion = informacion.Descripcion;
                existing.Objetivos = informacion.Objetivos;
                existing.PerfilEgresado = informacion.PerfilEgresado;
                existing.CampoLaboral = informacion.CampoLaboral;
                existing.Competencias = informacion.Competencias;
                existing.UpdatedAt = DateTime.UtcNow;
                _context.InformacionCarrera.Update(existing);
            }
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<AreaEspecializacion>> GetAreasAsync()
        {
            return await _context.AreasEspecializacion.Where(a => a.IsActive).ToListAsync();
        }

        public async Task<AreaEspecializacion?> GetAreaByIdAsync(Guid id)
        {
            return await _context.AreasEspecializacion.FirstOrDefaultAsync(a => a.Id == id && a.IsActive);
        }

        public async Task<AreaEspecializacion> AddAreaAsync(AreaEspecializacion area)
        {
            await _context.AreasEspecializacion.AddAsync(area);
            await _context.SaveChangesAsync();
            return area;
        }

        public async Task UpdateAreaAsync(AreaEspecializacion area)
        {
            _context.AreasEspecializacion.Update(area);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAreaAsync(Guid id)
        {
            var area = await _context.AreasEspecializacion.FindAsync(id);
            if (area != null)
            {
                area.IsActive = false;
                _context.AreasEspecializacion.Update(area);
                await _context.SaveChangesAsync();
            }
        }
    }
}