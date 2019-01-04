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
                return Ok(new MAEF());

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
           var actionsCode = "Return To AO";
           var history = new History();
           var currentHistory =  await maefService.FindRemarksAsync(id,actionsCode);

           if (history == null)
           return NotFound();
           history.RequestId= id;
           history.actionCode= currentHistory.actionCode;
           history.remarks = currentHistory.remarks;
           history.action="Return To AO: Submitted";
           history.user= currentHistory.user;
           history.groupCode= currentHistory.groupCode;
           history.date = DateTime.Now;           
            await maefService.InsertRemarksAsync(history);
            await maefService.SaveChangesAsync();
           
            bdoFormHeaderService.Update(request, 9);
            await bdoFormHeaderService.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("returnToMamo/{id}")]
        public async Task<IActionResult> ReturnToMamo(int id)
        {
           var request = await bdoFormHeaderService.FindAsync(id);
           var actionsCode = "Return To MAMO";
           var history = new History();
           var currentHistory =  await maefService.FindRemarksAsync(id,actionsCode);
           if (history == null)
           return NotFound();
           history.RequestId= id;
           history.actionCode= currentHistory.actionCode;
           history.remarks = currentHistory.remarks;
           history.action="Return To MAMO: Submitted";
           history.user= currentHistory.user;
           history.groupCode= currentHistory.groupCode;
           history.date = DateTime.Now;           
            await maefService.InsertRemarksAsync(history);
            await maefService.SaveChangesAsync();

            bdoFormHeaderService.Update(request, 10);
            await bdoFormHeaderService.SaveChangesAsync();
            return Ok();
        }   

        [HttpPut("decline/{id}")]
        public async Task<IActionResult> Decline(int id)
        {        
            var request =  new ApprovalCount { user = "testf", requestId = id, approve = false };
            await bdoFormHeaderService.InsertAsync(request); 
            await bdoFormHeaderService.SaveChangesAsync();             
            var actionsCode = "Decline";
            var history = new History();
            var currentHistory =  await maefService.FindRemarksAsync(id,actionsCode); 
           if (history == null)
           return NotFound();
           history.RequestId= id;
           history.actionCode= currentHistory.actionCode;
           history.remarks = currentHistory.remarks;
           history.action="Decline: Submitted";
           history.user= currentHistory.user;
           history.groupCode= currentHistory.groupCode;
           history.date = DateTime.Now;           
            await maefService.InsertRemarksAsync(history);
            await maefService.SaveChangesAsync();

           var appCount = await bdoFormHeaderService.DeclineCountAsync(id);
           if(appCount >= 2)
           {
           var requestData = await bdoFormHeaderService.FindAsync(id);
            bdoFormHeaderService.Update(requestData, 2);
            await bdoFormHeaderService.SaveChangesAsync();
           }              
           
            return Ok();
        }               

        [HttpPut("submitToApprover/{id}")]
        public async Task<IActionResult> SubmitToApprover(int id)
        {
           var request = await bdoFormHeaderService.FindAsync(id);
            bdoFormHeaderService.Update(request, 8);
            await bdoFormHeaderService.SaveChangesAsync();
            return Ok();
        }    

        [HttpPut("approve/{id}")]
        public async Task<IActionResult> Approve(int id)
        {          
            var request =  new ApprovalCount { user = "testf", requestId = id, approve = true };
            await bdoFormHeaderService.InsertAsync(request);
            await bdoFormHeaderService.SaveChangesAsync(); 

            var actionsCode = "Approve";
            var history = new History();
           if (history == null)
           return NotFound();
           history.RequestId= id;
           history.actionCode= actionsCode;
           history.action="Approve: Submitted";
           history.user= "testr";
           history.groupCode= "mauEncoder";
           history.date = DateTime.Now;
            await maefService.InsertRemarksAsync(history);
            await maefService.SaveChangesAsync();            

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var maef = await maefService.FindAsync(id);
            
            if (maef == null)
                return NotFound();
 
            if (maef.approver1 == null)
            {
            maef.approver1 = "App1";
            maef.decisionDate1 = DateTime.Now;
            }
            else if (maef.approver2 == null)
            {
            maef.approver2 = "App2";
            maef.decisionDate2 = DateTime.Now;
            }
            else if (maef.approver3 == null)
            {
            maef.approver3 = "App3";
            maef.decisionDate3 = DateTime.Now;
            }
            maefService.Update(maef);

            await maefService.SaveChangesAsync();      

           var appCount = await bdoFormHeaderService.ApproveCountAsync(id);
           if(appCount >= 2)
            { 
               if(maef.chkWithReq && maef.chkWithException && maef.chkApprovePendingCust)
                 {
                    var requestData = await bdoFormHeaderService.FindAsync(id);
                    bdoFormHeaderService.Update(requestData, 16);
                 }  
               else if(maef.chkWithReq && maef.chkApprovePendingCust)
                 {
                    var requestData = await bdoFormHeaderService.FindAsync(id);
                    bdoFormHeaderService.Update(requestData, 17);
                 }     
               else if(maef.chkWithReq && maef.chkWithException)
                 {
                    var requestData = await bdoFormHeaderService.FindAsync(id);
                    bdoFormHeaderService.Update(requestData, 18);
                 }                   
               else if(maef.chkApprove)
                 {
                    var requestData = await bdoFormHeaderService.FindAsync(id);
                    bdoFormHeaderService.Update(requestData, 11);
                 }
               else if(maef.chkDecline)
                 {
                    var requestData = await bdoFormHeaderService.FindAsync(id);
                    bdoFormHeaderService.Update(requestData, 12);
                 }
               else if(maef.chkWithReq)
                 {
                    var requestData = await bdoFormHeaderService.FindAsync(id);
                    bdoFormHeaderService.Update(requestData, 13);
                 } 
               else if(maef.chkWithException)
                 {
                    var requestData = await bdoFormHeaderService.FindAsync(id);
                    bdoFormHeaderService.Update(requestData, 15);
                 }     
               else if(maef.chkApprovePendingCust)
                 {
                    var requestData = await bdoFormHeaderService.FindAsync(id);
                    bdoFormHeaderService.Update(requestData, 14);
                 }  
  
                                                                                                
            await bdoFormHeaderService.SaveChangesAsync();
            }                    
                     
            return Ok();
        }  

        [HttpGet("approvalCount/{id}")]
        public async Task<IActionResult> ApprovalCount(int id)
        {
            var appCount = await bdoFormHeaderService.ApproveCountAsync(id);

            //if (appCount == null)
            //    return Ok(false);

            return Ok(appCount);
        }                     


    }
}