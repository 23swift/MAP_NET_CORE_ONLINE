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
    [Route("api/MauOfficerDashboard")]
    public class MauOfficerDashboardController : Controller
    {
        private IMauOfficerDashboardService _service;
        private ILogger<MauOfficerDashboardController> _logger;

        public MauOfficerDashboardController(ILogger<MauOfficerDashboardController> logger, 
                                             IMauOfficerDashboardService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet()]
        public async Task<IActionResult> Get()
        {
           var requests = await _service.FindAsync();
           return Ok(requests);
        }
    }
}