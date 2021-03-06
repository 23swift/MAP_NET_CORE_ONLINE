using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;
using System.Collections.Generic;

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

            bool isValid = await midService.ValidateAndInsertMidAsync(mid);

            if (isValid)
            {
                await midService.SaveChangesAsync();
            }
            else
            {
                return Ok(isValid);
            }

            return Ok(mid);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMID([FromBody] MIDViewModel mid, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            bool isValid = await midService.ValidateAndUpdateMidAsync(mid, id);

            if (isValid)
            {
                await midService.SaveChangesAsync();
            }
            else
            {
                return Ok(isValid);
            }

            return Ok(mid);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMID(int id)
        {
            var currentMid = await midService.FindAsync(id);

            if (currentMid == null)
                return NotFound();

            await midService.Delete(currentMid);
            await midService.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("mid/{val}/{Id}")]
        public async Task<IActionResult> SaveMid(string val,int Id)
        {
            await midService.SaveMid(val, Id);
            await midService.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("tid/{val}/{Id}")]
        public async Task<IActionResult> SaveTid(string val, int Id)
        {
            await midService.SaveTid(val, Id);
            await midService.SaveChangesAsync();
            return Ok();
        }
        
        [HttpGet("validate/{id}")]
        public async Task<IActionResult> ValidateMID(int id)
        {
            bool isValid = await midService.ValidateMIDCount(id);

            return Ok(isValid);
        }

        [HttpGet("existingMonitorCodes/{id}")]
        public async Task<IActionResult> GetExistingMonitorCodes(int id)
        {
            var mids = await midService.FindByBranchAsync(id);
            IList<string> midList = await midService.FindExistingMonitorCodesAsync(mids.Items);

            return Ok(midList);
        }

        [HttpGet("defaultMonitorCodes")]
        public async Task<IActionResult> GetDefaultMonitorCodes()
        {
            IList<string> midList = await midService.FindDefaultMonitorCodesAsync();

            return Ok(midList);
        }
    }
}