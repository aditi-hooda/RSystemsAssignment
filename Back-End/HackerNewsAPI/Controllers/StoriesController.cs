using HackerNewsAPI.Services;
using Microsoft.AspNetCore.Mvc;
using HackerNewsAPI.Models;

namespace HackerNewsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoriesController : ControllerBase
    {
        private readonly IStoriesService _hackerNewsService;

        public StoriesController(IStoriesService hackerNewsService)
        {
            _hackerNewsService = hackerNewsService;
        }

        // GET: api/stories/newest
        [HttpGet("newest")]
        public async Task<ActionResult<List<Story>>> GetNewestStories(int pageSize = 10, int pageNumber = 1)
        {
            try
            {
                var stories = await _hackerNewsService.GetNewestStoriesAsync(pageSize, pageNumber);
                return Ok(stories);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500,ex.Message);
            }
        }

        // GET: api/stories/search?query={query}
        [HttpGet("search")]
        public ActionResult<List<Story>> SearchStories(string query, int pageSize = 10, int pageNumber = 1)
        {
            try
            {
                var stories = _hackerNewsService.SearchStoriesAsync(query, pageSize, pageNumber);
                return Ok(stories);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, ex.Message);
            }
        }
    }
}
