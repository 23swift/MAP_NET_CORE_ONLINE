using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MAP_Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            //  services.AddAuthentication(options =>
            //     {
            //         options.DefaultScheme = "Cookies";
            //         options.DefaultChallengeScheme = "oidc";
            //     })
            //     .AddCookie("Cookies")
                
            //     .AddOpenIdConnect("oidc", options =>
            //     {
            //         options.SignInScheme = "Cookies";

            //         options.Authority = "http://localhost:5003";
            //         options.RequireHttpsMetadata = false;

            //         options.ClientId = "map";
            //         options.ClientSecret = "secret";
            //         options.ResponseType = "code id_token";

            //         options.SaveTokens = true;
            //         options.GetClaimsFromUserInfoEndpoint = true;

            //         // options.Scope.Add("api1");
            //         // options.Scope.Add("offline_access");
            //         // options.Events= new Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectEvents{
            //         //     OnAuthorizationCodeReceived = (context) => {
            //         //             context.Response.Redirect("http:localhost:5000/");
            //         //         return Task.FromResult(0);
            //         //     }
            //         // };
                    
                    
            //     });
            services.AddDbContext<DataAccess.MAP_Context>(options=> options.UseSqlServer(Configuration.GetConnectionString("MAP_DB")))
            .AddHttpClient()
            .AddUnitOfWork<DataAccess.MAP_Context>();
            services.AddScoped<Services.IEmployeeService,Services.EmployeeService>();
            services.AddScoped<Services.IAOMaintenanceService,Services.AOMaintenanceService>();
            services.AddScoped<Services.IMauOfficerDashboardService, Services.MauOfficerDashboardService>();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
			
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
               
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
		    
            // app.UseAuthentication();
          
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
              
            
            
            // app.Use(async (context, next) =>
            //                                             {
            //                                                 if (!context.User.Identity.IsAuthenticated)
            //                                                     {
            //                                                         await context.ChallengeAsync("oidc");
            //                                                     }
            //                                                     else
            //                                                     {
            //                                                         await next();
            //                                                     }
            //                                             });
                    app.UseSpa(spa =>
                    {
                        // To learn more about options for serving an Angular SPA from ASP.NET Core,
                        // see https://go.microsoft.com/fwlink/?linkid=864501

                        spa.Options.SourcePath = "ClientApp";

                        if (env.IsDevelopment())
                        {
                            // spa.UseAngularCliServer(npmScript: "build");
                            // spa.UseAngularCliServer(npmScript: "start");
                            // spa.UseAngularCliServer( "ng serve");
                            spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");


                            
                        }
                    });  
                            
                    }
                }
                
}
