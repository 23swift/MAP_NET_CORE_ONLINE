using System.Threading.Tasks;
using MAP_Web.Services;
using Microsoft.AspNetCore.Mvc;
using MAP_Web.Models.ViewModels;
using System.Collections.Generic;

namespace MAP_Web.Controllers
{
    [Route("/api/mdcsCheckerDashboard")]
    public class MDCSCheckerDashboardController : Controller
    {
        private readonly IMDCSCheckerDashboardService _service;
        public MDCSCheckerDashboardController(IMDCSCheckerDashboardService _service)
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