using Microsoft.AspNetCore.Mvc;
using PlataformaWeb.API.DTOs.Academic;
using PlataformaWeb.API.Services;

namespace PlataformaWeb.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AcademicoController : ControllerBase
    {
        private readonly IAcademicFacade _facade;

        public AcademicoController(IAcademicFacade facade)
        {
            _facade = facade;
        }

        [HttpGet("malla")]
        public async Task<ActionResult<IEnumerable<SubjectDto>>> GetMallaCurricular()
        {
            var malla = await _facade.GetMallaCurricularAsync();
            return Ok(malla);
        }

        [HttpGet("asignatura/{code}")]
        public async Task<ActionResult<SubjectDetailDto>> GetDetalleAsignatura(string code)
        {
            var detalle = await _facade.GetDetalleAsignaturaAsync(code);

            if (detalle == null)
            {
                return NotFound(new { message = $"No se encontró la asignatura con sigla {code}" });
            }

            return Ok(detalle);
        }
    }
}