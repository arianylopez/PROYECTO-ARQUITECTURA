using System.Text.Json.Serialization;

namespace PlataformaWeb.API.Models
{
    public class Teacher
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string Specialty { get; set; } = string.Empty;
        public string? Bio { get; set; }
        public string? LinkedinUrl { get; set; }
        public string? PhotoUrl { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public ICollection<TeacherSubject> TeacherSubjects { get; set; } = new List<TeacherSubject>();
    }

    public class TeacherSubject
    {
        public Guid TeacherId { get; set; }
        public Guid SubjectId { get; set; }

        [JsonIgnore]
        public Teacher? Teacher { get; set; }
        public Subject? Subject { get; set; }
    }

    public class Alumni
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public int GraduationYear { get; set; }
        public string? CurrentCompany { get; set; }
        public string? CurrentPosition { get; set; }
        public string? LinkedinUrl { get; set; }
        public string? PhotoUrl { get; set; }
        public bool IsVisible { get; set; } = true;
    }
}