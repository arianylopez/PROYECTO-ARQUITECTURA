using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortalInfoSoftware.Application.DTOs;
using PortalInfoSoftware.Application.Interfaces;

namespace PortalInfoSoftware.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VidaEstudiantilController : ControllerBase
    {
        private readonly IVidaEstudiantilService _vidaEstudiantilService;

        public VidaEstudiantilController(IVidaEstudiantilService vidaEstudiantilService)
        {
            _vidaEstudiantilService = vidaEstudiantilService;
        }

        [HttpGet("galeria")]
        public async Task<ActionResult<IEnumerable<ImagenGaleriaDTO>>> GetGaleria()
        {
            var galeria = await _vidaEstudiantilService.ObtenerGaleriaAsync();
            return Ok(galeria);
        }

        [Authorize]
        [HttpPost("galeria")]
        public async Task<ActionResult<ImagenGaleriaDTO>> PostImagen([FromBody] ImagenGaleriaCreateDTO dto)
        {
            var imagen = await _vidaEstudiantilService.AgregarImagenAsync(dto);
            return Ok(imagen);
        }

        [Authorize]
        [HttpDelete("galeria/{id:guid}")]
        public async Task<IActionResult> DeleteImagen(Guid id)
        {
            await _vidaEstudiantilService.EliminarImagenAsync(id);
            return NoContent();
        }

        [HttpGet("relatos")]
        public async Task<ActionResult<IEnumerable<RelatoEstudiantilDTO>>> GetRelatos()
        {
            var relatos = await _vidaEstudiantilService.ObtenerRelatosAsync();
            return Ok(relatos);
        }

        [Authorize]
        [HttpPost("relatos")]
        public async Task<ActionResult<RelatoEstudiantilDTO>> PostRelato([FromBody] RelatoEstudiantilCreateDTO dto)
        {
            var relato = await _vidaEstudiantilService.AgregarRelatoAsync(dto);
            return Ok(relato);
        }

        [Authorize]
        [HttpPut("relatos/{id:guid}")]
        public async Task<IActionResult> PutRelato(Guid id, [FromBody] RelatoEstudiantilCreateDTO dto)
        {
            try
            {
                await _vidaEstudiantilService.ActualizarRelatoAsync(id, dto);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpDelete("relatos/{id:guid}")]
        public async Task<IActionResult> DeleteRelato(Guid id)
        {
            await _vidaEstudiantilService.EliminarRelatoAsync(id);
            return NoContent();
        }
    }
}