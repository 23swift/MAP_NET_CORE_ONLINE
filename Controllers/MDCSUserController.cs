using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Controllers
{
    [Route("/api/mdcsUser")]
    public class MDCSUserController : Controller
    {
        private readonly IMDCSUserService mdcsUserService;

        public MDCSUserController(IMDCSUserService mdcsUserService)
        {
            this.mdcsUserService = mdcsUserService;
        }

        [HttpGet("validateMid/{id}")]
        public IActionResult ValidateMid(int id)
        {
            var isValid = mdcsUserService.ValidateMid(id);
            return Ok(isValid);
        }

    }
}