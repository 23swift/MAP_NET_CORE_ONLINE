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
    [Route("/api/mqrUserDashboard")]
    public class MqrUserDashboardController : Controller
    {
        private readonly IMqrUserDashboardService _service;
        public MqrUserDashboardController(IMqrUserDashboardService _service)
        {
            this._service = _service;
        }

        [HttpGet()]
        public async Task<IActionResult> GetRequests()
        {
            var requests = await _service.FindAsync();
            
            return Ok(requests);
        }

        [HttpPost("mqrUserDashboard/{id}")]
        public async Task<IActionResult> GetMAEFData(int id)
        {
            await _service.InsertMAEFDataAsync(id);
            await _service.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{field}/{sortDirection}/{pageIndex}/{pageSize}/{filter?}")]
        public async Task<IActionResult> GetRequestsList(string field, string sortDirection, int pageIndex, int pageSize, string filter = "")
        {
            var requests = await _service.GetListAsync(field, sortDirection, pageIndex, pageSize, filter);

            return Ok(requests);
        }

        [HttpGet("count")]
        public async Task<IActionResult> GetListCount()
        {
            var count = await _service.GetListCount();

            return Ok(count);
        }
    }
}