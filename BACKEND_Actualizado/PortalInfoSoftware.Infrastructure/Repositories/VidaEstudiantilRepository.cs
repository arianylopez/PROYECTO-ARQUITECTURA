using Microsoft.EntityFrameworkCore;
using PortalInfoSoftware.Application.Interfaces;
using PortalInfoSoftware.Domain.Entities;
using PortalInfoSoftware.Infrastructure.Persistence;

namespace PortalInfoSoftware.Infrastructure.Repositories
{
    public class VidaEstudiantilRepository : IVidaEstudiantilRepository
    {
        private readonly ApplicationDbContext _context;

        public VidaEstudiantilRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ImagenGaleria>> GetImagenesAsync()
        {
            return await _context.ImagenesGaleria.Where(i => i.IsActive).OrderByDescending(i => i.CreatedAt).ToListAsync();
        }

        public async Task<ImagenGaleria?> GetImagenByIdAsync(Guid id)
        {
            return await _context.ImagenesGaleria.FirstOrDefaultAsync(i => i.Id == id && i.IsActive);
        }

        public async Task<ImagenGaleria> AddImagenAsync(ImagenGaleria imagen)
        {
            await _context.ImagenesGaleria.AddAsync(imagen);
            await _context.SaveChangesAsync();
            return imagen;
        }

        public async Task DeleteImagenAsync(Guid id)
        {
            var imagen = await _context.ImagenesGaleria.FindAsync(id);
            if (imagen != null)
            {
                imagen.IsActive = false;
                _context.ImagenesGaleria.Update(imagen);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<RelatoEstudiantil>> GetRelatosAsync()
        {
            return await _context.RelatosEstudiantiles.Where(r => r.IsActive).OrderByDescending(r => r.CreatedAt).ToListAsync();
        }

        public async Task<RelatoEstudiantil?> GetRelatoByIdAsync(Guid id)
        {
            return await _context.RelatosEstudiantiles.FirstOrDefaultAsync(r => r.Id == id && r.IsActive);
        }

        public async Task<RelatoEstudiantil> AddRelatoAsync(RelatoEstudiantil relato)
        {
            await _context.RelatosEstudiantiles.AddAsync(relato);
            await _context.SaveChangesAsync();
            return relato;
        }

        public async Task UpdateRelatoAsync(RelatoEstudiantil relato)
        {
            _context.RelatosEstudiantiles.Update(relato);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteRelatoAsync(Guid id)
        {
            var relato = await _context.RelatosEstudiantiles.FindAsync(id);
            if (relato != null)
            {
                relato.IsActive = false;
                _context.RelatosEstudiantiles.Update(relato);
                await _context.SaveChangesAsync();
            }
        }
    }
}