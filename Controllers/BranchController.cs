using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MAP_Web.Models.ViewModels;
using AutoMapper;
using System.Collections.Generic;
using System.Xml.Serialization;
using Microsoft.CSharp;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace MAP_Web.Controllers
{
    [Route("/api/branch")]
    public class BranchController : Controller
    {
        private readonly IBranchService branchService;
        private readonly IMapper mapper;
        private IHostingEnvironment hostingEnvironment;

        public BranchController(IBranchService branchService, IMapper mapper, IHostingEnvironment hostingEnvironment)
        {
            this.mapper = mapper;
            this.branchService = branchService;
            this.hostingEnvironment = hostingEnvironment;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBranch(int id)
        {
            var branch = await branchService.FindAsync(id);

            if (branch == null)
                return NotFound();

            var mappedBranch = mapper.Map<Branch, BranchViewModel>(branch);

            return Ok(mappedBranch);
        }

        [HttpGet("newAffiliation/{id}")]
        public async Task<IActionResult> GetBranchByNewAffiliation(int id)
        {
            var branch = await branchService.FindByNewAffiliationAsync(id);

            if (branch == null)
                return NotFound();

            var mappedBranch = mapper.Map<IList<Branch>, IList<BranchViewModel>>(branch.Items);

            return Ok(mappedBranch);
        }

        [HttpGet("branchAutoPopulate/{id}")]
        public async Task<IActionResult> GetBranchAutoPopulate(int id)
        {
            var branch = await branchService.FindAsync(id);

            if (branch == null)
                return NotFound();

            var mappedFields = mapper.Map<Branch, BranchAutoPopulateFields>(branch);

            return Ok(mappedFields);
        }

        [HttpGet("mappedBranch/{id}")]
        public async Task<IActionResult> GetMappedBranch(int id)
        {
            var branch = await branchService.FindAsync(id);

            if (branch == null)
                return NotFound();

            var mappedFields = mapper.Map<Branch, BranchViewModel>(branch);

            return Ok(mappedFields);
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

            await branchService.Update(currentBranch);
            await branchService.SaveChangesAsync();

            return Ok(currentBranch);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTerminalDetails(int id)
        {
            var currentBranch = await branchService.FindAsync(id);

            if (currentBranch == null)
                return NotFound();

            await branchService.Delete(currentBranch);
            await branchService.SaveChangesAsync();

            return Ok();
        }


        [HttpGet("getFirstOrDefaultOwnerByBranch/{id}")]
        public async Task<IActionResult> getFirstOrDefaultOwnerByBranch(int id)
        {
            var currentOwner = await branchService.GetFirstOrDefaultOwnerByBranchAsync(id);

            if (currentOwner == null)
                return NotFound();

            return Ok(currentOwner);
        }


        [HttpGet("validateSinglePropOwnership/{branchId}")]
        public async Task<IActionResult> ValidateSinglePropOwnershipByBranch(int branchId)
        {
            bool isSingleProp = await branchService.ValidateSinglePropOwnership(branchId);

            return Ok(isSingleProp);
        }

        [HttpGet("printAdmrc")]
        public async Task<IActionResult> PrintAdmrc([FromBody] BranchViewModel branch)
        {
            XmlSerializer xmlWriter = new XmlSerializer(branch.GetType());
            var path = hostingEnvironment.ContentRootPath + "//DataSet//dsPrintAdmrc.xml";
            FileStream file = System.IO.File.Create(path);
            xmlWriter.Serialize(file, branch);
            file.Close();
            return Ok();
        }
    }
}