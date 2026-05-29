using PlataformaWeb.API.DTOs.Community;
using PlataformaWeb.API.Repositories;

namespace PlataformaWeb.API.Services
{
    public interface ICommunityFacade
    {
        Task<IEnumerable<TeacherDto>> GetTeachersDirectoryAsync();
        Task<IEnumerable<AlumniDto>> GetAlumniDirectoryAsync();
    }

    public class CommunityFacade : ICommunityFacade
    {
        private readonly ICommunityRepository _repository;

        public CommunityFacade(ICommunityRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<TeacherDto>> GetTeachersDirectoryAsync()
        {
            var teachers = await _repository.GetActiveTeachersAsync();

            return teachers.Select(t => new TeacherDto
            {
                Id = t.Id,
                FullName = $"{t.FirstName} {t.LastName}",
                Specialty = t.Specialty,
                Bio = t.Bio,
                LinkedinUrl = t.LinkedinUrl,
                PhotoUrl = t.PhotoUrl,
                SubjectsTaught = t.TeacherSubjects.Select(ts => ts.Subject!.Name).ToList()
            });
        }

        public async Task<IEnumerable<AlumniDto>> GetAlumniDirectoryAsync()
        {
            var alumni = await _repository.GetVisibleAlumniAsync();

            return alumni.Select(a => new AlumniDto
            {
                Id = a.Id,
                FullName = $"{a.FirstName} {a.LastName}",
                GraduationYear = a.GraduationYear,
                CurrentCompany = a.CurrentCompany,
                CurrentPosition = a.CurrentPosition,
                LinkedinUrl = a.LinkedinUrl,
                PhotoUrl = a.PhotoUrl
            });
        }
    }
}