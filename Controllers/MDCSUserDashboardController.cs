using System.Threading.Tasks;
using MAP_Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace MAP_Web.Controllers
{
    [Route("/api/mdcsUserDashboard")]
    public class MDCSUserDashboardController : Controller
    {
        private readonly IMDCSUserDashboardService _service;
        public MDCSUserDashboardController(IMDCSUserDashboardService _service)
        {
            this._service = _service;
        }

        [HttpGet()]
        public async Task<IActionResult> GetRequests()
        {
            var requests = await _service.FindAsync();

            return Ok(requests);
        }
    }
}