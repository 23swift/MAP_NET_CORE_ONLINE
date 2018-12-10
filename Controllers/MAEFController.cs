using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Controllers
{
    [Route("/api/maef")]
    public class MAEFController : Controller
    {
        private readonly IMAEFService maefService;
        private readonly IMapper mapper;
        public MAEFController(IMAEFService maefService, IMapper mapper)
        {
            this.mapper = mapper;
            this.maefService = maefService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMAEF(int id)
        {
            var maef = await maefService.FindAsync(id);

            if (maef == null)
                return NotFound();

            return Ok(maef);
        }


        [HttpPost]
        public async Task<IActionResult> CreateMAEF([FromBody] MAEF maef)
        {
            if (!ModelState.IsValid)
            return BadRequest(ModelState);

            await maefService.InsertAsync(maef);
            await maefService.SaveChangesAsync();

            return Ok(maef);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMAEF([FromBody] MAEFViewModel maef, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentMaef = await maefService.FindAsyncMaefId(id);
            
            if (currentMaef == null)
                return NotFound();

            mapper.Map<MAEFViewModel, MAEF>(maef, currentMaef);
            maefService.Update(currentMaef);
            await maefService.SaveChangesAsync();

            return Ok(currentMaef);
        }
    }
}