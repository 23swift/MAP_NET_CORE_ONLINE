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
            var currentPrincipal = new ClaimsPrincipal(id);
            Thread.CurrentPrincipal = currentPrincipal;

            // var identity = User.Identity as ClaimsIdentity;
            var r = User.IsInRole("AO Encoder");
            var claims = id.Claims.ToList();
            ClaimsViewModel claimsVm = new ClaimsViewModel {
                userGroup = claims.Where(c => c.Type == "role").SingleOrDefault().Value,
                name = claims.Where(c => c.Type == "name").SingleOrDefault().Value,
            };
            var uid = User.Identity.Name;
            // TODO: Your code here
            return Ok(claimsVm);
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