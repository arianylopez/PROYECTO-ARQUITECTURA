using Microsoft.EntityFrameworkCore;
using PortalInfoSoftware.Application.Interfaces;
using PortalInfoSoftware.Domain.Entities;
using PortalInfoSoftware.Infrastructure.Persistence;

namespace PortalInfoSoftware.Infrastructure.Repositories
{
    public class ArticulosRepository : IArticulosRepository
    {
        private readonly ApplicationDbContext _context;

        public ArticulosRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Articulo>> ObtenerPublicadosAsync(string? categoria)
        {
            var query = _context.Articulos.Where(a => a.Estado == "Publicado").AsQueryable();

            if (!string.IsNullOrEmpty(categoria))
            {
                query = query.Where(a => a.Categoria.ToLower() == categoria.ToLower());
            }

            return await query.OrderByDescending(a => a.FechaPublicacion).ToListAsync();
        }

        public async Task<IEnumerable<Articulo>> ObtenerPendientesAsync()
        {
            return await _context.Articulos
                .Where(a => a.Estado == "Pendiente")
                .OrderBy(a => a.CreatedAt)
                .ToListAsync();
        }

        public async Task<Articulo?> GetByIdAsync(Guid id)
        {
            return await _context.Articulos.FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Articulo> AddAsync(Articulo articulo)
        {
            await _context.Articulos.AddAsync(articulo);
            await _context.SaveChangesAsync();
            return articulo;
        }

        public async Task UpdateAsync(Articulo articulo)
        {
            _context.Articulos.Update(articulo);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var articulo = await _context.Articulos.FindAsync(id);
            if (articulo != null)
            {
                _context.Articulos.Remove(articulo);
                await _context.SaveChangesAsync();
            }
        }
    }
}