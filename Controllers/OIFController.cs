using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Controllers
{
    [Route("/api/oif")]
    public class OIFController : Controller
    {
        private readonly IOIFService oifService;
        private readonly IMapper mapper;
        public OIFController(IOIFService oifService, IMapper mapper)
        {
            this.mapper = mapper;
            this.oifService = oifService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOIF(int id)
        {
            var oif = await oifService.FindAsync(id);

            if (oif == null)
                return NotFound();

            return Ok(oif);
        }

        [HttpGet("branch/{id}")]
        public async Task<IActionResult> GetOifByBranch(int id)
        {
            var oif = await oifService.FindByBranchAsync(id);

            if (oif == null)
                return Ok();

            return Ok(oif);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOIF([FromBody] OIF oif)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await oifService.InsertAsync(oif);
            await oifService.SaveChangesAsync();

            return Ok(oif);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOIF([FromBody] OIFViewModel oif, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentOif = await oifService.FindAsync(id);

            if (currentOif == null)
                return NotFound();

            mapper.Map<OIFViewModel, OIF>(oif, currentOif);

            await oifService.SaveChangesAsync();

            return Ok(currentOif);
        }
    }
}