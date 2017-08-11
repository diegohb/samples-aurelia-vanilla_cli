using Microsoft.AspNetCore.Mvc;

namespace dotnetnew_mvc.Controllers
{
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
