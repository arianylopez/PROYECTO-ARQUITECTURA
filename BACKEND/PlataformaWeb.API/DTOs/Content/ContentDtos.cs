namespace PlataformaWeb.API.DTOs.Content
{
    public class PostDto
    {
        public Guid Id { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string? CoverImageUrl { get; set; }
        public DateTime? EventStartDate { get; set; }
        public DateTime? EventEndDate { get; set; }
        public string? Location { get; set; }
        public string? ExternalRegistrationUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsPublished { get; set; }
    }

    public class CreatePostDto
    {
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
    }

    public class UpdatePostDto
    {
        public string Type { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string? CoverImageUrl { get; set; } // Añadimos soporte para la imagen
        public DateTime? EventStartDate { get; set; }
        public DateTime? EventEndDate { get; set; }
        public string? Location { get; set; }
        public string? ExternalRegistrationUrl { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsPublished { get; set; }
    }
}