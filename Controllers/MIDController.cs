using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Controllers
{
    [Route("/api/mid")]
    public class MIDController : Controller
    {
        private readonly IMIDService midService;
        private readonly IMapper mapper;

        public MIDController(IMIDService midService, IMapper mapper)
        {
            this.mapper = mapper;
            this.midService = midService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMID(int id)
        {
            var mid = await midService.FindAsync(id);

            if (mid == null)
                return NotFound();

            return Ok(mid);
        }

        [HttpGet("branch/{id}")]
        public async Task<IActionResult> GetMidByBranch(int id)
        {
            var mid = await midService.FindByBranchAsync(id);

            if (mid == null)
                return NotFound();

            return Ok(mid);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMID([FromBody] MID mid)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await midService.InsertAsync(mid);
            await midService.SaveChangesAsync();

            return Ok(mid);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMID([FromBody] MIDViewModel mid, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentMid = await midService.FindAsync(id);

            if (currentMid == null)
                return NotFound();

            mapper.Map<MIDViewModel, MID>(mid, currentMid);

            await midService.SaveChangesAsync();

            return Ok(mid);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMID(int id)
        {
            var currentMid = await midService.FindAsync(id);

            if (currentMid == null)
                return NotFound();

            midService.Delete(currentMid);
            await midService.SaveChangesAsync();

            return Ok();
        }
    }
}