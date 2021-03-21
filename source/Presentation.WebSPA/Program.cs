namespace Presentation.WebSPA
{
    #region

    using System.IO;
    using Microsoft.AspNetCore.Hosting;

    #endregion

    public class Program
    {
        public static IWebHostBuilder CreateWebHostBuilder(string[] argsParam)
        {
            return new WebHostBuilder().UseKestrel().UseContentRoot(Directory.GetCurrentDirectory()).UseIISIntegration().UseStartup<Startup>();
        }

        public static void Main(string[] argsParam)
        {
            var host = CreateWebHostBuilder(argsParam).Build();
            host.Run();
        }
    }
}