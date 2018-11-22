using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;

namespace MAP_Web.Controllers
{
    [Route("api/[controller]")]
    public class MauOfficerDashboardController : Controller
    {
        private IMauOfficerDashboardService _service;
        private ILogger<MauOfficerDashboardController> _logger;
        private IAOListModalService _aoListModalService;

        public MauOfficerDashboardController(ILogger<MauOfficerDashboardController> logger, 
                                             IMauOfficerDashboardService service, 
                                             IAOListModalService aoListModalService)
        {
            _logger = logger;
            _service = service;
            _aoListModalService = aoListModalService;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            try
            {
                var requests = await _service.GetRequests();
                
                List<Models.ViewModels.MauOfficerDashboardViewModel> finalResult = new List<Models.ViewModels.MauOfficerDashboardViewModel>();

                foreach (var item in requests)
                {
                    var createdDate = item.Request.CreatedDate.ToString();
                    var parsedDate = DateTime.Parse(createdDate);
                    var daySpan = (DateTime.Now - parsedDate).TotalHours;
                    var requestedBy = await _aoListModalService.GetByUserName(item.Request.CreatedBy);
                    var testUser = "a025005860"; // For Testing Purposes Only
                    
                    finalResult.Add(new Models.ViewModels.MauOfficerDashboardViewModel
                    {
                        RequestId = item.Request.Id,
                        ReferenceNo = item.Request.TrackingNo,
                        RequestedDate = item.Request.CreatedDate ?? System.DateTime.Now,
                        RequestType = item.Request.RequestDescription,
                        BusinessName = item.legalName,
                        DBAName =  item.dbaName,
                        RequestedBy = requestedBy.firstName + " " + requestedBy.lastName,
                        UserName = item.Request.Owner,
                        Status = item.Request.Owner == null ? "For Evaluation" : "For Re-Evaluation", //For Testing Purposes Only
                        TAT = (int)(daySpan + 0.5d),
                        isOwned = testUser == item.Request.Owner ? true : false
                    });
                }

                return Ok(finalResult);

            }
            catch (Exception)
            {
                _logger.LogError("Failed to execute GET");
                return BadRequest();
            }
        }
    }
}