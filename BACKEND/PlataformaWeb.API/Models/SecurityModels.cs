using Microsoft.Extensions.Hosting;
using System.Text.Json.Serialization;

namespace PlataformaWeb.API.Models
{
    public class Role
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }

        [JsonIgnore]
        public ICollection<User> Users { get; set; } = new List<User>();
    }

    public class User
    {
        public Guid Id { get; set; }
        public Guid RoleId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        [JsonIgnore]
        public string PasswordHash { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public Role? Role { get; set; }
        [JsonIgnore]
        public ICollection<Post> Posts { get; set; } = new List<Post>();
    }
}