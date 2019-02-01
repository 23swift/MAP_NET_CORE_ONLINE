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