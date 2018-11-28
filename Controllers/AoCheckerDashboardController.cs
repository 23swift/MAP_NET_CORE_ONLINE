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

        [HttpGet]
        public async Task<IActionResult> GetRequests()
        {
            var requests = await _service.FindAsync();

            return Ok(requests);
        }
    }
}