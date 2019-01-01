using System.Threading.Tasks;
using MAP_Web.Services;
using Microsoft.AspNetCore.Mvc;
using MAP_Web.Models.ViewModels;
using System.Collections.Generic;

namespace MAP_Web.Controllers
{
    [Route("/api/mdcsDashboard")]
    public class MDCSEncoderDashboardController : Controller
    {
        private readonly IMDCSEncoderDashboardService _service;
        public MDCSEncoderDashboardController(IMDCSEncoderDashboardService _service)
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