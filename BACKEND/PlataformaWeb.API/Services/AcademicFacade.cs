using PlataformaWeb.API.DTOs.Academic;
using PlataformaWeb.API.Repositories;

namespace PlataformaWeb.API.Services
{
    public interface IAcademicFacade
    {
        Task<IEnumerable<SubjectDto>> GetMallaCurricularAsync();
        Task<SubjectDetailDto?> GetDetalleAsignaturaAsync(string code);
    }

    public class AcademicFacade : IAcademicFacade
    {
        private readonly IAsignaturaRepository _repository;

        public AcademicFacade(IAsignaturaRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<SubjectDto>> GetMallaCurricularAsync()
        {
            var subjects = await _repository.GetAllSubjectsAsync();

            return subjects.Select(s => new SubjectDto
            {
                Code = s.Code,
                Name = s.Name,
                Credits = s.Credits,
                SemesterNumber = s.Semester?.Number ?? 0
            });
        }

        public async Task<SubjectDetailDto?> GetDetalleAsignaturaAsync(string code)
        {
            var subject = await _repository.GetSubjectByCodeAsync(code);

            if (subject == null) return null;

            return new SubjectDetailDto
            {
                Code = subject.Code,
                Name = subject.Name,
                Credits = subject.Credits,
                SemesterNumber = subject.Semester?.Number ?? 0,
                Description = subject.Description,
                Bibliography = subject.Bibliography,
                PrerequisitesCodes = subject.Requires.Select(req => req.Prerequisite!.Code).ToList()
            };
        }
    }
}