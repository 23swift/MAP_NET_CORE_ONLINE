using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;
using System.Security.Claims;
using System.Threading;
using System.Linq;
using IdentityModel.Client;
using Microsoft.AspNetCore.Authentication;
using System.Net.Http;

namespace MAP_Web.Controllers
{
    [EnableCors("MyProfile")]
    [Route("/api/cors")]
    public class CorsController : Controller
    {
        public CorsController()
        {

        }

        [HttpGet("access")]
        public IActionResult GetAccess()
        {
            var id = new ClaimsIdentity(User.Claims, "Forms", "name", "role");
            // var currentPrincipal = new ClaimsPrincipal(id);
            // Thread.CurrentPrincipal = currentPrincipal;

            // var identity = User.Identity as ClaimsIdentity;
            // var r = User.IsInRole("AO Encoder");
            var claims = id.Claims.ToList();
            ClaimsViewModel claimsVm = new ClaimsViewModel {
                name = claims.Where(c => c.Type == "name").SingleOrDefault().Value,
                rank = claims.Where(c => c.Type == "rank").SingleOrDefault().Value,
                role = claims.Where(c => c.Type == "role").Select(s => s.Value),
                access = claims.Where(c => c.Type == "access").Select(s => s.Value)
            };

            // claims.ForEach(v => {
            //     if (v.Type == "role") {
            //         claimsVm.role.Add(v.Value);
            //     }
            //     if (v.Type == "access") {
            //         claimsVm.access.Add(v.Value);
            //     }
            // });
            // var accessToken = await HttpContext.GetTokenAsync("access_token");
            // var client = new HttpClient();
            // client.SetBearerToken(accessToken);
            // var userInfoClient = client.GetUserInfoAsync(new UserInfoRequest { Address = "http://localhost:5000/connect/userinfo", Token = accessToken });
            // var response = userInfoClient.Result.Claims.ToList();
            // var uid = User.Identity.Name;
            // TODO: Your code here
            return Ok(claimsVm);
        }

        [HttpGet("name")]
        public IActionResult GetName()
        {
            var id = new ClaimsIdentity(User.Claims, "Forms", "name", "role");
            var claims = id.Claims.ToList();
            string userName = claims.Where(c => c.Type == "name").SingleOrDefault().Value;

            return Ok(new { name = userName });
        }

        [HttpGet("status")]
        public IActionResult GetStatus()
        {
            return Ok();
        }

        [HttpGet("approval")]
        public IActionResult GetApprovalMatrix()
        {
            return Ok();
        }

        [HttpGet("appr")]
        public IActionResult Get()
        {
            return Ok();
        }
    }
}