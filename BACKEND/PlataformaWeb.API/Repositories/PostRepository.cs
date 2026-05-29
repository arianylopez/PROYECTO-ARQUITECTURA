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
        Task<IEnumerable<Post>> GetAllPostsAsync();
        Task<bool> DeletePostAsync(Guid id);

        Task<Post?> GetPostByIdAsync(Guid id);
        Task UpdatePostAsync(Post post);
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

        public async Task<IEnumerable<Post>> GetAllPostsAsync()
        {
            return await _context.Posts
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        public async Task<bool> DeletePostAsync(Guid id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return false;
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Post?> GetPostByIdAsync(Guid id)
        {
            return await _context.Posts.FindAsync(id);
        }

        public async Task UpdatePostAsync(Post post)
        {
            _context.Posts.Update(post);
            await _context.SaveChangesAsync();
        }
    }
}