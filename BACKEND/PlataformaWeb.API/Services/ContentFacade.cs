using PlataformaWeb.API.DTOs.Content;
using PlataformaWeb.API.Factories;
using PlataformaWeb.API.Models;
using PlataformaWeb.API.Repositories;
using PlataformaWeb.API.Strategies;

namespace PlataformaWeb.API.Services
{
    public interface IContentFacade
    {
        Task<IEnumerable<PostDto>> GetUpcomingEventsAsync();
        Task<IEnumerable<PostDto>> GetHistoricalEventsAsync();
        Task<PostDto> CreatePostAsync(CreatePostDto dto);
        Task<IEnumerable<PostDto>> GetAllPostsAsync();
        Task<bool> DeletePostAsync(Guid id);
        Task<PostDto?> UpdatePostAsync(Guid id, UpdatePostDto dto);
    }

    public class ContentFacade : IContentFacade
    {
        private readonly IPostRepository _repository;

        public ContentFacade(IPostRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<PostDto>> GetUpcomingEventsAsync()
        {
            var posts = await _repository.GetPostsAsync(new UpcomingEventsStrategy());
            return MapToDto(posts);
        }

        public async Task<IEnumerable<PostDto>> GetHistoricalEventsAsync()
        {
            var posts = await _repository.GetPostsAsync(new HistoricalEventsStrategy());
            return MapToDto(posts);
        }

        public async Task<PostDto> CreatePostAsync(CreatePostDto dto)
        {
            var newPost = PostFactory.Create(dto);

            await _repository.CreatePostAsync(newPost);

            return MapToDto(new List<Post> { newPost }).First();
        }

        private IEnumerable<PostDto> MapToDto(IEnumerable<Post> posts)
        {
            return posts.Select(p => new PostDto
            {
                Id = p.Id,
                Type = p.Type,
                Title = p.Title,
                Content = p.Content,
                CoverImageUrl = p.CoverImageUrl,
                EventStartDate = p.EventStartDate,
                EventEndDate = p.EventEndDate,
                Location = p.Location,
                ExternalRegistrationUrl = p.ExternalRegistrationUrl,
                CreatedAt = p.CreatedAt,
                IsPublished = p.IsPublished // <-- NUEVA LÍNEA AGREGADA
            });
        }
        // 1. Agrega los métodos nuevos a la clase
        public async Task<IEnumerable<PostDto>> GetAllPostsAsync()
        {
            var posts = await _repository.GetAllPostsAsync();
            return MapToDto(posts);
        }

        public async Task<bool> DeletePostAsync(Guid id)
        {
            return await _repository.DeletePostAsync(id);
        }
        public async Task<PostDto?> UpdatePostAsync(Guid id, UpdatePostDto dto)
        {
            var post = await _repository.GetPostByIdAsync(id);
            if (post == null) return null;

            post.Type = dto.Type;
            post.Title = dto.Title;
            post.Content = dto.Content;
            post.CoverImageUrl = dto.CoverImageUrl;

            // ¡AQUÍ ESTÁ LA MAGIA! Convertimos a UTC
            post.EventStartDate = dto.EventStartDate?.ToUniversalTime();
            post.EventEndDate = dto.EventEndDate?.ToUniversalTime();

            post.Location = dto.Location;
            post.ExternalRegistrationUrl = dto.ExternalRegistrationUrl;
            post.IsPublished = dto.IsPublished;

            // Y esto siempre es UTC por defecto
            post.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdatePostAsync(post);

            return MapToDto(new List<Post> { post }).First();
        }
    }
}