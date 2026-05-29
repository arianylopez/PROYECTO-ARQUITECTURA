using PlataformaWeb.API.DTOs.Content;
using PlataformaWeb.API.Models;

namespace PlataformaWeb.API.Factories
{
    public static class PostFactory
    {
        public static Post Create(CreatePostDto dto)
        {
            var post = new Post
            {
                Id = Guid.NewGuid(),
                AuthorId = dto.AuthorId,
                CategoryId = dto.CategoryId,
                Title = dto.Title,
                Content = dto.Content,
                Type = dto.Type.ToUpper(),
                IsPublished = true, 
                PublishedAt = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow
            };

            if (post.Type == "EVENT")
            {
                if (!dto.EventStartDate.HasValue || !dto.EventEndDate.HasValue)
                    throw new ArgumentException("Los eventos requieren fecha de inicio y fin.");

                if (dto.EventStartDate >= dto.EventEndDate)
                    throw new ArgumentException("La fecha de inicio debe ser menor a la fecha de fin.");

                post.EventStartDate = dto.EventStartDate.Value.ToUniversalTime();
                post.EventEndDate = dto.EventEndDate.Value.ToUniversalTime();
                post.Location = dto.Location;
                post.ExternalRegistrationUrl = dto.ExternalRegistrationUrl;
            }
            else if (post.Type == "NEWS")
            {
                post.EventStartDate = null;
                post.EventEndDate = null;
                post.Location = null;
                post.ExternalRegistrationUrl = null;
            }
            else
            {
                throw new ArgumentException("El tipo de publicación debe ser 'NEWS' o 'EVENT'.");
            }

            return post;
        }
    }
}