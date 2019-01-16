
using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models.ViewModels;
using MAP_Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace MAP_Web.Controllers
{
    [Route("/api/mauEncoderDashboard")]
    public class MauEncoderDashboardController : Controller
    {
        
        private readonly IMauEncoderDashboardService _service;
        public MauEncoderDashboardController(IMauEncoderDashboardService _service)
        {
            this._service = _service;
        }
        [HttpGet()]
        public async Task<IActionResult> GetRequests()
        {
            var requests = await _service.FindAsync();
            return Ok(requests);
        }

        [HttpPut("filter")]
        public async Task<IActionResult> GetRequests([FromBody] FilterCriteriaViewModel filter)
        {
            var requests = await _service.FilterAsync(filter);

            if (requests.Count == 0) 
                requests = new List<DashboardViewModel>();

            return Ok(requests);
        }        
    }
}