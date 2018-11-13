using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MAP_NET_CORE_ONLINE.Services;
using MAP_Web.Models;

namespace MAP_Web.Controllers
{
    [Route("api/[controller]")]
    public class AOMaintenanceController : Controller
    {
        IAOMaintenanceService _aoMaintenanceService;
        ILogger<AOMaintenanceController> _logger;

        public AOMaintenanceController(ILogger<AOMaintenanceController> logger, IAOMaintenanceService aoMaintenanceService)
        {
            _logger = logger;
            _aoMaintenanceService = aoMaintenanceService;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            try
            {
                var result = await _aoMaintenanceService.Get();
                return Ok(result);
            }
            catch (Exception)
            {
                _logger.LogError("Failed to execute GET");
                return BadRequest();
            }
        }

        [HttpPut("GetByUserName/{userName}" )]
        public async Task<ActionResult> GetByUserName(string userName) 
        {
            try
            {
                var result = await _aoMaintenanceService.GetByUserName(userName);
                return Ok(result);
            }
            catch (Exception)
            {
                _logger.LogError("Failed to execute GET");
                return BadRequest();
            }
        }
        
    }
}