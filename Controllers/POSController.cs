using Microsoft.AspNetCore.Mvc;
using MAP_Web.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MAP_Web.Services;
using AutoMapper;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Controllers
{
    [Route("/api/pos")]
    public class POSController : Controller
    {
        private readonly IPOSService posService;
        private readonly IMapper mapper;
        public POSController(IPOSService posService, IMapper mapper)
        {
            this.mapper = mapper;
            this.posService = posService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPOS(int id)
        {
            var pos = await posService.FindAsync(id);

            if (pos == null)
                return NotFound();

            return Ok(pos);
        }

        [HttpGet("posAutoPopulate/{id}")]
        public async Task<IActionResult> GetPosAutoPopulate(int id)
        {
            var pos = await posService.FindPosAutoPopulate(id);

            return Ok(pos);
        }

        [HttpGet("branch/{id}")]
        public async Task<IActionResult> GetPOSByBranch(int id)
        {
            var pos = await posService.FindByBranchAsync(id);

            if (pos == null)
                return NotFound();

            return Ok(pos);
        }

        [HttpGet("validate/{id}")]
        public IActionResult ValidateOIF(int id)
        {
            var isValid = posService.ValidatePOS(id);

            return Ok(isValid);
        }

        [HttpGet("validateForPsServicing/{id}")]
        public async Task<IActionResult> ValidateForPsServicing(int id)
        {
            var isValid = await posService.ValidatePosForPsServicingAsync(id);

            return Ok(isValid);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePOS([FromBody] POS pos)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await posService.InsertAsync(pos);
            await posService.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePOS([FromBody] POSViewModel pos, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentPos = await posService.FindAsync(id);

            if (currentPos == null)
                return NotFound();

            mapper.Map<POSViewModel, POS>(pos, currentPos);

            await posService.Update(currentPos);
            await posService.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePOS(int id)
        {
            var currentPos = await posService.FindAsync(id);

            if (currentPos == null)
                return NotFound();

            await posService.Delete(currentPos);
            await posService.SaveChangesAsync();

            return Ok();
        }
    }
}