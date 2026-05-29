using System.Text.Json.Serialization;

namespace PlataformaWeb.API.Models
{
    public class StudyPlan
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int YearActive { get; set; }
        public bool IsCurrent { get; set; }

        public ICollection<Semester> Semesters { get; set; } = new List<Semester>();
    }

    public class Semester
    {
        public Guid Id { get; set; }
        public Guid StudyPlanId { get; set; }
        public int Number { get; set; }
        public string Name { get; set; } = string.Empty;

        [JsonIgnore]
        public StudyPlan? StudyPlan { get; set; }
        public ICollection<Subject> Subjects { get; set; } = new List<Subject>();
    }

    public class Subject
    {
        public Guid Id { get; set; }
        public Guid SemesterId { get; set; }
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public int Credits { get; set; }
        public string? Description { get; set; }
        public string? Bibliography { get; set; }
        public DateTime CreatedAt { get; set; }

        [JsonIgnore]
        public Semester? Semester { get; set; }

        [JsonIgnore]
        public ICollection<SubjectPrerequisite> PrerequisiteFor { get; set; } = new List<SubjectPrerequisite>();
        public ICollection<SubjectPrerequisite> Requires { get; set; } = new List<SubjectPrerequisite>();

        public ICollection<TeacherSubject> TeacherSubjects { get; set; } = new List<TeacherSubject>();
    }

    public class SubjectPrerequisite
    {
        public Guid SubjectId { get; set; }
        public Guid PrerequisiteId { get; set; }

        [JsonIgnore]
        public Subject? Subject { get; set; }
        public Subject? Prerequisite { get; set; }
    }
}