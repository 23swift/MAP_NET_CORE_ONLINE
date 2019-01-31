using System.Threading.Tasks;
using MAP_Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace MAP_Web.Controllers
{
    [Route("/api/aoCheckerDashboardApi")]
    public class AoCheckerDashboardController : Controller
    {
        private readonly IAoCheckerDashboardService _service;
        public AoCheckerDashboardController(IAoCheckerDashboardService _service)
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
    }
}