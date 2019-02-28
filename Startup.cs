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
using AutoMapper;
using MAP_Web.Services;

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
            services.AddDbContext<DataAccess.MAP_Context>(options => options.UseSqlServer(Configuration.GetConnectionString("MAP_DB")))
            .AddHttpClient()
            .AddUnitOfWork<DataAccess.MAP_Context>();
            services.AddAutoMapper();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IAOMaintenanceService, AOMaintenanceService>();
            services.AddScoped<IMauOfficerDashboardService, MauOfficerDashboardService>();
            services.AddScoped<IAOListModalService, AOListModalService>();
            services.AddScoped<IBranchService, BranchService>();
            services.AddScoped<ICustomerProfileService, CustomerProfileService>();
            services.AddScoped<IDocumentChecklistService, DocumentChecklistService>();
            services.AddScoped<IMIDService, MIDService>();
            services.AddScoped<IOwnersService, OwnersService>();
            services.AddScoped<ISignatoriesService, SignatoriesService>();
            services.AddScoped<IPOSService, POSService>();
            services.AddScoped<ITerminalDetailsService, TerminalDetailsService>();
            services.AddScoped<IOIFService, OIFService>();
            services.AddScoped<IParameterMaintenanceService, ParameterMaintenanceService>();
            services.AddScoped<IBUMaintenanceService, BUMaintenanceService>();
            services.AddScoped<IServiceFeeContractService, ServiceFeeContractService>();
            services.AddScoped<IAoEncoderDashboardService, AoEncoderDashboardService>();
            services.AddScoped<IAoCheckerDashboardService, AoCheckerDashboardService>();
            services.AddScoped<INewAffiliationService, NewAffiliationService>();
            services.AddScoped<IDropdownService, DropdownService>();
            services.AddScoped<IDocumentListService, DocumentListService>();
            services.AddScoped<IRequestHeaderService, RequestHeaderService>();
            services.AddScoped<IMauEncoderDashboardService, MauEncoderDashboardService>();
            services.AddScoped<IMAEFService, MAEFService>();
            services.AddScoped<IApproveWithReqReasonService, ApproveWithReqReasonService>();
            services.AddScoped<IApproveWithExceptDetailsService, ApproveWithExceptDetailsService>();
            services.AddScoped<IHistoryService, HistoryService>();
            services.AddScoped<IBdoFormHeaderService, BdoFormHeaderService>();
            services.AddScoped<IPSServicingDashboardService, PSServicingDashboardService>();
            services.AddScoped<IMDCSEncoderDashboardService, MDCSEncoderDashboardService>();
            services.AddScoped<IApproverDashboardService, ApproverDashboardService>();
            services.AddScoped<IMDCSCheckerDashboardService, MDCSCheckerDashboardService>();
            services.AddScoped<IMDCSUserDashboardService, MDCSUserDashboardService>();
            services.AddScoped<IRequestService, RequestService>();
            services.AddScoped<IMDMDashboardService, MDMDashboardService>();
            // services.AddScoped<IMDCSUserDashboardService, MDCSUserDashboardService>();
            services.AddScoped<IMDCSUserService, MDCSUserService>();
            services.AddScoped<IMqrUserDashboardService, MqrUserDashboardService>();
            services.AddScoped<IApproveWithExceptDetailsMqrService, ApproveWithExceptDetailsMqrService>();
            services.AddScoped<IApproveWithReqReasonMqrService, ApproveWithReqReasonMqrService>();
            services.AddScoped<IApproveWithExceptDetailsAwrService, ApproveWithExceptDetailsAwrService>();
            services.AddScoped<IAwrMaefFormService, AwrMaefFormService>();
            services.AddScoped<IReturnRemarksService, ReturnRemarksService>();



            // TO BE DELETED
            services.AddScoped<IStatusService, StatusService>();
            services.AddDbContext<DataAccess.AuditLog_Context>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("Log_DB")));
            services.AddTransient<IAuditLogService,AuditLogService>();

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
