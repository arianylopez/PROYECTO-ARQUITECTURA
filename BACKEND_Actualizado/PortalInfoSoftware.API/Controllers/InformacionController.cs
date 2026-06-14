using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortalInfoSoftware.Application.DTOs;
using PortalInfoSoftware.Application.Interfaces;

namespace PortalInfoSoftware.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InformacionController : ControllerBase
    {
        private readonly IInformacionService _informacionService;

        public InformacionController(IInformacionService informacionService)
        {
            _informacionService = informacionService;
        }

        [HttpGet]
        public async Task<ActionResult<InformacionCarreraDTO>> GetInformacion()
        {
            var info = await _informacionService.ObtenerInformacionAsync();
            return Ok(info);
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> PutInformacion([FromBody] InformacionCarreraDTO dto)
        {
            await _informacionService.ActualizarInformacionAsync(dto);
            return NoContent();
        }

        [HttpGet("areas")]
        public async Task<ActionResult<IEnumerable<AreaEspecializacionDTO>>> GetAreas()
        {
            var areas = await _informacionService.ObtenerAreasAsync();
            return Ok(areas);
        }

        [HttpGet("areas/{id:guid}")]
        public async Task<ActionResult<AreaEspecializacionDTO>> GetArea(Guid id)
        {
            var area = await _informacionService.ObtenerAreaPorIdAsync(id);
            if (area == null) return NotFound();
            return Ok(area);
        }

        [Authorize]
        [HttpPost("areas")]
        public async Task<ActionResult<AreaEspecializacionDTO>> PostArea([FromBody] AreaEspecializacionCreateDTO dto)
        {
            var area = await _informacionService.CrearAreaAsync(dto);
            return CreatedAtAction(nameof(GetArea), new { id = area.Id }, area);
        }

        [Authorize]
        [HttpPut("areas/{id:guid}")]
        public async Task<IActionResult> PutArea(Guid id, [FromBody] AreaEspecializacionCreateDTO dto)
        {
            try
            {
                await _informacionService.ActualizarAreaAsync(id, dto);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpDelete("areas/{id:guid}")]
        public async Task<IActionResult> DeleteArea(Guid id)
        {
            await _informacionService.EliminarAreaAsync(id);
            return NoContent();
        }
    }
}