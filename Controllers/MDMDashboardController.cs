using System.Threading.Tasks;
using MAP_Web.Services;
using Microsoft.AspNetCore.Mvc;
using MAP_Web.Models.ViewModels;
using System.Collections.Generic;

namespace MAP_Web.Controllers
{
    [Route("/api/mdmUserDashboard")]
    public class MDMDashboardController : Controller
    {
        private readonly IMDMDashboardService _service;
        public MDMDashboardController(IMDMDashboardService _service)
        {
            this._service = _service;
        }
        
        [HttpGet]
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