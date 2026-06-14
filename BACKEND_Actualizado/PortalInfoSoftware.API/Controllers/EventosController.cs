using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortalInfoSoftware.Application.DTOs;
using PortalInfoSoftware.Application.Interfaces;

namespace PortalInfoSoftware.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {
        private readonly IEventosService _eventosService;

        public EventosController(IEventosService eventosService)
        {
            _eventosService = eventosService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventoPublicoDTO>>> GetEventos([FromQuery] string filtro = "proximos")
        {
            var eventos = await _eventosService.ObtenerEventosFiltradosAsync(filtro);
            return Ok(eventos);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<EventoPublicoDTO>> GetEvento(Guid id)
        {
            var evento = await _eventosService.ObtenerEventoPorIdAsync(id);
            if (evento == null) return NotFound();
            return Ok(evento);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<EventoPublicoDTO>> PostEvento([FromBody] EventoCreateDTO dto)
        {
            try
            {
                var autorIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (autorIdClaim == null) return Unauthorized();

                var autorId = Guid.Parse(autorIdClaim);
                var evento = await _eventosService.CrearEventoAsync(dto, autorId);

                return CreatedAtAction(nameof(GetEvento), new { id = evento.Id }, evento);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [Authorize]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteEvento(Guid id)
        {
            await _eventosService.EliminarEventoAsync(id);
            return NoContent();
        }
    }
}