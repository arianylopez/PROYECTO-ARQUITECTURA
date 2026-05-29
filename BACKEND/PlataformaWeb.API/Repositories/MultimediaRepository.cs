using Microsoft.EntityFrameworkCore;
using PlataformaWeb.API.Data;
using PlataformaWeb.API.Models;

namespace PlataformaWeb.API.Repositories
{
    public interface IMultimediaRepository
    {
        Task<IEnumerable<Banner>> GetActiveBannersAsync();
        Task<IEnumerable<GalleryAlbum>> GetAllAlbumsAsync();
        Task<GalleryAlbum?> GetAlbumWithImagesAsync(Guid albumId);
    }

    public class MultimediaRepository : IMultimediaRepository
    {
        private readonly AppDbContext _context;

        public MultimediaRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Banner>> GetActiveBannersAsync()
        {
            var now = DateTime.UtcNow;

            return await _context.Banners
                .Where(b => b.IsActive
                         && (b.DisplayStart == null || b.DisplayStart <= now)
                         && (b.DisplayEnd == null || b.DisplayEnd >= now))
                .OrderBy(b => b.PositionOrder)
                .ToListAsync();
        }

        public async Task<IEnumerable<GalleryAlbum>> GetAllAlbumsAsync()
        {
            return await _context.GalleryAlbums
                .OrderByDescending(a => a.CreatedAt)
                .ToListAsync();
        }

        public async Task<GalleryAlbum?> GetAlbumWithImagesAsync(Guid albumId)
        {
            return await _context.GalleryAlbums
                .Include(a => a.Images.OrderBy(i => i.UploadDate)) 
                .FirstOrDefaultAsync(a => a.Id == albumId);
        }
    }
}