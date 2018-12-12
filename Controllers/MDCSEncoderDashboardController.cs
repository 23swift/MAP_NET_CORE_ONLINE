using System.Threading.Tasks;
using MAP_Web.Services;
using Microsoft.AspNetCore.Mvc;

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
    }
}