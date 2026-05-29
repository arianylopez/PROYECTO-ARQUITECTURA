using Microsoft.AspNetCore.Mvc;
using PlataformaWeb.API.DTOs.Community;
using PlataformaWeb.API.Services;

namespace PlataformaWeb.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComunidadController : ControllerBase
    {
        private readonly ICommunityFacade _facade;

        public ComunidadController(ICommunityFacade facade)
        {
            _facade = facade;
        }

        [HttpGet("docentes")]
        public async Task<ActionResult<IEnumerable<TeacherDto>>> GetDocentes()
        {
            var docentes = await _facade.GetTeachersDirectoryAsync();
            return Ok(docentes);
        }

        [HttpGet("alumni")]
        public async Task<ActionResult<IEnumerable<AlumniDto>>> GetAlumni()
        {
            var alumni = await _facade.GetAlumniDirectoryAsync();
            return Ok(alumni);
        }
    }
}