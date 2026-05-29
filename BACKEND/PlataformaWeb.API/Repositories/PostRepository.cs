using Microsoft.EntityFrameworkCore;
using PlataformaWeb.API.Data;
using PlataformaWeb.API.Models;
using PlataformaWeb.API.Strategies;

namespace PlataformaWeb.API.Repositories
{
    public interface IPostRepository
    {
        Task<IEnumerable<Post>> GetPostsAsync(IEventFilterStrategy filterStrategy);
        Task CreatePostAsync(Post post);
    }

    public class PostRepository : IPostRepository
    {
        private readonly AppDbContext _context;

        public PostRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Post>> GetPostsAsync(IEventFilterStrategy filterStrategy)
        {
            var query = _context.Posts.AsQueryable();

            query = filterStrategy.ApplyFilter(query);

            return await query.ToListAsync();
        }

        public async Task CreatePostAsync(Post post)
        {
            await _context.Posts.AddAsync(post);
            await _context.SaveChangesAsync();
        }
    }
}