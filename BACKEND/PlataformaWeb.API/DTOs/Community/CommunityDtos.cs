namespace PlataformaWeb.API.DTOs.Community
{
    public class TeacherDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty; 
        public string Specialty { get; set; } = string.Empty;
        public string? Bio { get; set; }
        public string? LinkedinUrl { get; set; }
        public string? PhotoUrl { get; set; }

        public List<string> SubjectsTaught { get; set; } = new List<string>();
    }

    public class AlumniDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public int GraduationYear { get; set; }
        public string? CurrentCompany { get; set; }
        public string? CurrentPosition { get; set; }
        public string? LinkedinUrl { get; set; }
        public string? PhotoUrl { get; set; }
    }
}