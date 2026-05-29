using System.Text.Json.Serialization;

namespace PlataformaWeb.API.Models
{
    public class Banner
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string? TargetUrl { get; set; }
        public int PositionOrder { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime? DisplayStart { get; set; }
        public DateTime? DisplayEnd { get; set; }
    }

    public class GalleryAlbum
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? CoverImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }

        public ICollection<GalleryImage> Images { get; set; } = new List<GalleryImage>();
    }

    public class GalleryImage
    {
        public Guid Id { get; set; }
        public Guid AlbumId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string? Caption { get; set; }
        public DateTime UploadDate { get; set; }

        [JsonIgnore]
        public GalleryAlbum? Album { get; set; }
    }
}