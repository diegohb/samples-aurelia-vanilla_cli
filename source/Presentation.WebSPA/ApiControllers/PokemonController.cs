namespace Presentation.WebSPA.ApiControllers
{
    using System.IO;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("api/pokemon")]
    public class PokemonController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public PokemonController(IWebHostEnvironment envParam)
        {
            _env = envParam;
        }

        [HttpGet]
        [Produces("application/json")]
        [Route("")]
        public Task<IActionResult> GetAll()
        {
            var path = Path.Combine(_env.ContentRootPath, "./Data/pokedex.json");
            var stream = System.IO.File.Open(path, FileMode.Open, FileAccess.Read);
            return Task.FromResult<IActionResult>(File(stream, "application/json"));
        }
    }
}