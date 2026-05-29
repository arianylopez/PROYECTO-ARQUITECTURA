using PlataformaWeb.API.DTOs.Multimedia;
using PlataformaWeb.API.Repositories;

namespace PlataformaWeb.API.Services
{
    public interface IMultimediaFacade
    {
        Task<IEnumerable<BannerDto>> GetMainBannersAsync();
        Task<IEnumerable<GalleryAlbumDto>> GetAlbumsDirectoryAsync();
        Task<GalleryAlbumDetailDto?> GetAlbumDetailsAsync(Guid albumId);
    }

    public class MultimediaFacade : IMultimediaFacade
    {
        private readonly IMultimediaRepository _repository;

        public MultimediaFacade(IMultimediaRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<BannerDto>> GetMainBannersAsync()
        {
            var banners = await _repository.GetActiveBannersAsync();

            return banners.Select(b => new BannerDto
            {
                Id = b.Id,
                Title = b.Title,
                ImageUrl = b.ImageUrl,
                TargetUrl = b.TargetUrl,
                PositionOrder = b.PositionOrder
            });
        }

        public async Task<IEnumerable<GalleryAlbumDto>> GetAlbumsDirectoryAsync()
        {
            var albums = await _repository.GetAllAlbumsAsync();

            return albums.Select(a => new GalleryAlbumDto
            {
                Id = a.Id,
                Title = a.Title,
                Description = a.Description,
                CoverImageUrl = a.CoverImageUrl,
                CreatedAt = a.CreatedAt
            });
        }

        public async Task<GalleryAlbumDetailDto?> GetAlbumDetailsAsync(Guid albumId)
        {
            var album = await _repository.GetAlbumWithImagesAsync(albumId);

            if (album == null) return null;

            return new GalleryAlbumDetailDto
            {
                Id = album.Id,
                Title = album.Title,
                Description = album.Description,
                CoverImageUrl = album.CoverImageUrl,
                CreatedAt = album.CreatedAt,
                Images = album.Images.Select(i => new GalleryImageDto
                {
                    Id = i.Id,
                    ImageUrl = i.ImageUrl,
                    Caption = i.Caption
                }).ToList()
            };
        }
    }
}