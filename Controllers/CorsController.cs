using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Controllers
{
    [EnableCors("MyProfile")]
    [Route("/api/cors")]
    public class CorsController : Controller
    {
        public CorsController()
        {
            
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