namespace PlataformaWeb.API.DTOs.Multimedia
{
    public class BannerDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string? TargetUrl { get; set; }
        public int PositionOrder { get; set; }
    }

    public class GalleryAlbumDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? CoverImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class GalleryImageDto
    {
        public Guid Id { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string? Caption { get; set; }
    }

    public class GalleryAlbumDetailDto : GalleryAlbumDto
    {
        public List<GalleryImageDto> Images { get; set; } = new List<GalleryImageDto>();
    }
}