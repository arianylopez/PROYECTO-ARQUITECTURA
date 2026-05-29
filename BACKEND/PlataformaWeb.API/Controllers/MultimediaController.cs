using Microsoft.AspNetCore.Mvc;
using PlataformaWeb.API.DTOs.Multimedia;
using PlataformaWeb.API.Services;

namespace PlataformaWeb.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MultimediaController : ControllerBase
    {
        private readonly IMultimediaFacade _facade;

        public MultimediaController(IMultimediaFacade facade)
        {
            _facade = facade;
        }

        [HttpGet("banners")]
        public async Task<ActionResult<IEnumerable<BannerDto>>> GetBanners()
        {
            var banners = await _facade.GetMainBannersAsync();
            return Ok(banners);
        }

        [HttpGet("galeria")]
        public async Task<ActionResult<IEnumerable<GalleryAlbumDto>>> GetGaleria()
        {
            var albums = await _facade.GetAlbumsDirectoryAsync();
            return Ok(albums);
        }

        [HttpGet("galeria/{id:guid}")]
        public async Task<ActionResult<GalleryAlbumDetailDto>> GetDetalleAlbum(Guid id)
        {
            var detalle = await _facade.GetAlbumDetailsAsync(id);

            if (detalle == null)
            {
                return NotFound(new { message = $"No se encontró el álbum con ID {id}" });
            }

            return Ok(detalle);
        }
    }
}