namespace Presentation.WebSPA.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult SPAOne()
        {
            return View();
        }

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