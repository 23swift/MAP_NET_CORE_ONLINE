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

        [HttpGet()]
        public async Task<IActionResult> GetRequests()
        {
            var requests = await _service.FindRequestAsync();
            return Ok(requests);
        }
    }
}