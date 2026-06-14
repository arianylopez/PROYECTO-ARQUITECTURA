using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortalInfoSoftware.Application.DTOs;
using PortalInfoSoftware.Application.Interfaces;

namespace PortalInfoSoftware.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticulosController : ControllerBase
    {
        private readonly IArticulosService _articulosService;

        public ArticulosController(IArticulosService articulosService)
        {
            _articulosService = articulosService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArticuloPublicoDTO>>> GetArticulos([FromQuery] string? categoria)
        {
            var articulos = await _articulosService.ObtenerArticulosPublicadosAsync(categoria);
            return Ok(articulos);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<ArticuloPublicoDTO>> GetArticulo(Guid id)
        {
            var articulo = await _articulosService.ObtenerArticuloPorIdAsync(id);
            if (articulo == null) return NotFound();
            return Ok(articulo);
        }

        [HttpPost]
        public async Task<ActionResult<ArticuloPublicoDTO>> PostArticulo([FromBody] ArticuloCreateDTO dto)
        {
            var articulo = await _articulosService.EnviarArticuloAsync(dto);
            return CreatedAtAction(nameof(GetArticulo), new { id = articulo.Id }, articulo);
        }

        [Authorize]
        [HttpGet("pendientes")]
        public async Task<ActionResult<IEnumerable<ArticuloPublicoDTO>>> GetArticulosPendientes()
        {
            var articulos = await _articulosService.ObtenerArticulosPendientesAsync();
            return Ok(articulos);
        }

        [Authorize]
        [HttpPut("{id:guid}/estado")]
        public async Task<IActionResult> PutEstadoArticulo(Guid id, [FromBody] ArticuloEstadoDTO dto)
        {
            try
            {
                await _articulosService.CambiarEstadoArticuloAsync(id, dto);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteArticulo(Guid id)
        {
            await _articulosService.EliminarArticuloAsync(id);
            return NoContent();
        }
    }
}