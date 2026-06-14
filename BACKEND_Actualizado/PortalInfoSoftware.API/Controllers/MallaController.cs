using Microsoft.AspNetCore.Mvc;
using PortalInfoSoftware.Application.DTOs;
using PortalInfoSoftware.Application.Interfaces;

namespace PortalInfoSoftware.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MallaController : ControllerBase
    {
        private readonly IMallaService _mallaService;

        public MallaController(IMallaService mallaService)
        {
            _mallaService = mallaService;
        }

        [HttpGet("materias")]
        public async Task<ActionResult<IEnumerable<MateriaDTO>>> GetMallaCurricular()
        {
            var malla = await _mallaService.ObtenerMallaCurricularAsync();
            return Ok(malla);
        }

        [HttpGet("materias/{sigla}")]
        public async Task<ActionResult<MateriaDetalleDTO>> GetDetalleMateria(string sigla)
        {
            var detalle = await _mallaService.ObtenerDetalleMateriaAsync(sigla.ToUpper());

            if (detalle == null) return NotFound();

            return Ok(detalle);
        }
    }
}