using System.Text.Json.Serialization;

namespace PlataformaWeb.API.Models
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;

        [JsonIgnore]
        public ICollection<Post> Posts { get; set; } = new List<Post>();
    }

    public class Post
    {
        public Guid Id { get; set; }
        public Guid AuthorId { get; set; }
        public Guid CategoryId { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string? CoverImageUrl { get; set; }
        public DateTime? EventStartDate { get; set; }
        public DateTime? EventEndDate { get; set; }
        public string? Location { get; set; }
        public string? ExternalRegistrationUrl { get; set; }
        public bool IsPublished { get; set; }
        public DateTime? PublishedAt { get; set; }
        public DateTime CreatedAt { get; set; }

        public User? Author { get; set; }
        public Category? Category { get; set; }
    }
}