namespace Presentation.WebSPA.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    public class HomeController : Controller
    {
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }

        [Route("One")]
        public IActionResult SPAOne()
        {
            return View();
        }

        [Route("Two")]
        public IActionResult SPATwo()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}