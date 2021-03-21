namespace Presentation.WebSPA.ApiControllers
{
    using System.IO;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    [ApiController]
    [Route("api/pokemon")]
    public class PokemonController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly ILogger<PokemonController> _logger;

        public PokemonController(IWebHostEnvironment envParam, ILogger<PokemonController> loggerParam)
        {
            _env = envParam;
            _logger = loggerParam;
        }

        [HttpGet]
        [Produces("application/json")]
        [Route("")]
        public Task<IActionResult> GetAll()
        {
            var path = Path.Combine(_env.ContentRootPath, "./Data/pokedex.json");
            var stream = System.IO.File.Open(path, FileMode.Open, FileAccess.Read);
            _logger.LogInformation($">>>>>>>>>>>>>>>>>>>>>>>>>>>Loaded pokedex json file with {stream.Length} bytes.");
            return Task.FromResult<IActionResult>(File(stream, "application/json"));
        }
    }
}