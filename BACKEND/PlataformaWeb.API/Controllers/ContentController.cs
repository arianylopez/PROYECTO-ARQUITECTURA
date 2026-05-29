using Microsoft.AspNetCore.Mvc;
using PlataformaWeb.API.DTOs.Content;
using PlataformaWeb.API.Services;

namespace PlataformaWeb.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContentController : ControllerBase
    {
        private readonly IContentFacade _facade;

        public ContentController(IContentFacade facade)
        {
            _facade = facade;
        }

        [HttpGet("events/upcoming")]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetUpcomingEvents()
        {
            var events = await _facade.GetUpcomingEventsAsync();
            return Ok(events);
        }

        [HttpGet("events/historical")]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetHistoricalEvents()
        {
            var events = await _facade.GetHistoricalEventsAsync();
            return Ok(events);
        }

        [HttpPost("posts")]
        public async Task<ActionResult<PostDto>> CreatePost([FromBody] CreatePostDto dto)
        {
            try
            {
                var createdPost = await _facade.CreatePostAsync(dto);
                return CreatedAtAction(nameof(GetUpcomingEvents), new { id = createdPost.Id }, createdPost);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}