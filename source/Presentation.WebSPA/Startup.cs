namespace Presentation.WebSPA
{
    using System.IO;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.FileProviders;
    using Microsoft.Extensions.Logging;

    public class Startup
    {
        public Startup(IHostingEnvironment env, IConfiguration config)
        {
            Configuration = config;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddRazorPages(opts =>
            {
                opts.Conventions.AddPageRoute("/Rolodex", "Rolodex/{*route}");
                opts.Conventions.AddPageRoute("/Pokemon", "Pokemon/{*route}");
            });
            services.AddLogging(pLoggingBuilder =>
            {
                pLoggingBuilder.AddConfiguration(Configuration.GetSection("Logging"));
                pLoggingBuilder.AddConsole(pOpts => pOpts.IncludeScopes = true);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();

                //This allows you to debug your ts files in browser using the mappings provided by gulp-typescript
                app.UseStaticFiles
                (new StaticFileOptions
                {
                    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"src")),
                    RequestPath = new PathString("/src")
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
                endpoints.MapControllers();
            });
        }
    }
}