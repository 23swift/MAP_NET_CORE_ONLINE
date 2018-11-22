using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MAP_Web.Models.ViewModels;
using AutoMapper;

namespace MAP_Web.Controllers
{
    [Route("/api/branch")]
    public class BranchController : Controller
    {
        private readonly IBranchService branchService;
        private readonly IMapper mapper;

        public BranchController(IBranchService branchService, IMapper mapper)
        {
            this.mapper = mapper;
            this.branchService = branchService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBranch(int id)
        {
            var branch = await branchService.FindAsync(id);

            if (branch == null)
                return NotFound();

            return Ok(branch);
        }

        [HttpGet("newAffiliation/{id}")]
        public async Task<IActionResult> GetBranchByNewAffiliation(int id)
        {
            var branch = await branchService.FindByNewAffiliationAsync(id);

            if (branch == null)
                return NotFound();

            return Ok(branch);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBranch([FromBody] Branch branch)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await branchService.InsertAsync(branch);
            await branchService.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBranch([FromBody] BranchViewModel branch, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentBranch = await branchService.FindAsync(id);

            if (currentBranch == null)
                return NotFound();

            mapper.Map<BranchViewModel, Branch>(branch, currentBranch);

            await branchService.SaveChangesAsync();

            return Ok(currentBranch);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTerminalDetails(int id)
        {
            var currentBranch = await branchService.FindAsync(id);

            if (currentBranch == null)
                return NotFound();

            branchService.Delete(currentBranch);
            await branchService.SaveChangesAsync();

            return Ok();
        }
    }
}