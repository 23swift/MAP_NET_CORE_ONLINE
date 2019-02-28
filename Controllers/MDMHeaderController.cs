using System.Threading.Tasks;
using MAP_Web.Services;
using Microsoft.AspNetCore.Mvc;
using MAP_Web.Models.ViewModels;
using System.Collections.Generic;

namespace MAP_Web.Controllers
{
    [Route("/api/mdmHeader")]
    public class MDMHeaderController : Controller
    {
        private readonly IMDMHeaderService _service;
        public MDMHeaderController(IMDMHeaderService _service)
        {
            this._service = _service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetHeader(int id)
        {
            var request = await _service.GetMDMHeader(id);

            if (request == null)
                return NotFound();

            return Ok(request);
        }
    }
}