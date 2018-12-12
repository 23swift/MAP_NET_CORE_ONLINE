using System.Threading.Tasks;
using MAP_Web.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MAP_Web.Controllers
{
    [Route("api/psServicingDashboard")]
    public class PSServicingDashboardController : Controller
    {
        private readonly IPSServicingDashboardService _service;
        private ILogger<PSServicingDashboardController> _logger;
        public PSServicingDashboardController(ILogger<PSServicingDashboardController> logger,
                                             IPSServicingDashboardService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet()]
        public async Task<IActionResult> GetRequests()
        {
            var requests = await _service.FindAsync();
            return Ok(requests);
        }
    }
}