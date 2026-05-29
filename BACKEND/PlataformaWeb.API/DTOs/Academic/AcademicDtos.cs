namespace PlataformaWeb.API.DTOs.Academic
{
    public class SubjectDto
    {
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public int Credits { get; set; }
        public int SemesterNumber { get; set; }
    }

    public class SubjectDetailDto : SubjectDto
    {
        public string? Description { get; set; }
        public string? Bibliography { get; set; }
        public List<string> PrerequisitesCodes { get; set; } = new List<string>();
    }
}