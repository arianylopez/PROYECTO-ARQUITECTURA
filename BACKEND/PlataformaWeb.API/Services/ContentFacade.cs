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
                CreatedAt = p.CreatedAt
            });
        }
    }
}