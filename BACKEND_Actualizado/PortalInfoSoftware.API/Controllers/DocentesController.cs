using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortalInfoSoftware.Application.DTOs;
using PortalInfoSoftware.Application.Interfaces;

namespace PortalInfoSoftware.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocentesController : ControllerBase
    {
        private readonly IDocentesService _docentesService;

        public DocentesController(IDocentesService docentesService)
        {
            _docentesService = docentesService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DocentePublicoDTO>>> GetDocentes()
        {
            var docentes = await _docentesService.ObtenerDocentesPublicosAsync();
            return Ok(docentes);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<DocentePublicoDTO>> GetDocente(Guid id)
        {
            var docente = await _docentesService.ObtenerDocentePorIdAsync(id);
            if (docente == null) return NotFound();
            return Ok(docente);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<DocentePublicoDTO>> PostDocente([FromBody] DocenteCreateDTO dto)
        {
            var docente = await _docentesService.CrearDocenteAsync(dto);
            return CreatedAtAction(nameof(GetDocente), new { id = docente.Id }, docente);
        }

        [Authorize]
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> PutDocente(Guid id, [FromBody] DocenteCreateDTO dto)
        {
            try
            {
                await _docentesService.ActualizarDocenteAsync(id, dto);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteDocente(Guid id)
        {
            await _docentesService.EliminarDocenteAsync(id);
            return NoContent();
        }
    }
}