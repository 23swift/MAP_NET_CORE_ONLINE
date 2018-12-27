using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;
using System;
using System.Linq;

namespace MAP_Web.Controllers
{
    [Route("/api/maef")]
    public class MAEFController : Controller
    {
        private readonly IMAEFService maefService;

        private readonly IBdoFormHeaderService bdoFormHeaderService;

        private readonly IMapper mapper;
        public MAEFController(IMAEFService maefService, IBdoFormHeaderService bdoFormHeaderService, IMapper mapper)
        {
            this.mapper = mapper;
            this.maefService = maefService;
            this.bdoFormHeaderService = bdoFormHeaderService;
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

        [HttpPost("history")]
        public async Task<IActionResult> CreateHistory([FromBody] History history)
        {
            if (!ModelState.IsValid)
            return BadRequest(ModelState);

            await maefService.InsertRemarksAsync(history);
            await maefService.SaveChangesAsync();

            return Ok(history);
        }

        [HttpGet("history/{id}/{actions}")]
        public async Task<IActionResult> GetRemarks(int id, string actions)
        {
            var history = await maefService.FindRemarksAsync(id, actions);

            if (history == null)
                return NotFound();

            return Ok(history);
        }

        [HttpGet("historyCheck/{id}/{actions}")] // check if already contain remarks
        public async Task<IActionResult> CheckRemarks(int id, string actions)
        {
            var history = await maefService.CheckRemarksAsync(id, actions);

            if (history == null)
                return Ok(false);

            return Ok(true);
        }

        [HttpPut("returnToAo/{id}")]
        public async Task<IActionResult> ReturnToAo(int id)
        {
           var request = await bdoFormHeaderService.FindAsync(id);
            bdoFormHeaderService.Update(request, 15);
            await bdoFormHeaderService.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("returnToMamo/{id}")]
        public async Task<IActionResult> ReturnToMamo(int id)
        {
           var request = await bdoFormHeaderService.FindAsync(id);
            bdoFormHeaderService.Update(request, 13);
            await bdoFormHeaderService.SaveChangesAsync();
            return Ok();
        }   

        [HttpPut("decline/{id}")]
        public async Task<IActionResult> Decline(int id)
        {
           var request = await bdoFormHeaderService.FindAsync(id);
            bdoFormHeaderService.Update(request, 14);
            await bdoFormHeaderService.SaveChangesAsync();
            return Ok();
        }               

        [HttpPut("submitToApprover/{id}")]
        public async Task<IActionResult> SubmitToApprover(int id)
        {
           var request = await bdoFormHeaderService.FindAsync(id);
            bdoFormHeaderService.Update(request, 6);
            await bdoFormHeaderService.SaveChangesAsync();
            return Ok();
        }    

        [HttpPut("approve/{id}")]
        public async Task<IActionResult> Approve(int id)
        {
           var appCount = await bdoFormHeaderService.ApprovalCountAsync(id);
           if(appCount >= 2)
            {
            var request = await bdoFormHeaderService.FindAsync(id);
            bdoFormHeaderService.Update(request, 7);
            await bdoFormHeaderService.SaveChangesAsync();
            }
           else 
           {
            var request =  new ApprovalCount { user = "testr", requestId = id  };
            await bdoFormHeaderService.InsertAsync(request);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentMaef = await maefService.FindAsync(id);
            
            if (currentMaef == null)
                return NotFound();
            var maef = new MAEFViewModel { approver1 = "testr" };   

            mapper.Map<MAEFViewModel, MAEF>(maef, currentMaef);
            maefService.Update(currentMaef);

            await bdoFormHeaderService.SaveChangesAsync(); 
            await maefService.SaveChangesAsync();              
           }           
            return Ok();
        }  

        [HttpGet("approvalCount/{id}")]
        public async Task<IActionResult> ApprovalCount(int id)
        {
            var appCount = await bdoFormHeaderService.ApprovalCountAsync(id);

            //if (appCount == null)
            //    return Ok(false);

            return Ok(appCount);
        }                     


    }
}