using System.Threading.Tasks;
using MAP_Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace MAP_Web.Controllers
{
    [Route("/api/aoEncoderDashboard")]
    public class AoEncoderDashboardController : Controller
    {
        private readonly IAoEncoderDashboardService _service;
        public AoEncoderDashboardController(IAoEncoderDashboardService _service)
        {
            this._service = _service;
        }
        [HttpGet("{pageIndex}/{pageSize}/{filter}/{sortDirection}")]
        public async Task<IActionResult> GetRequestsList(int pageIndex, int pageSize, string filter = "", bool sortDirection = false)
        {
            var requests = await _service.GetListAsync(pageIndex, pageSize, filter, sortDirection);

            return Ok(requests);
        }

        // TO BE DELETED ONCE THE SERVER SIDE PAGINATION IS IMPLEMENTED
        [HttpGet()]
        public async Task<IActionResult> GetRequests()
        {
            var requests = await _service.FindAsync();

            return Ok(requests);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var requests = await _service.FindAsync(id);

            if (requests == null)
                return NotFound();

            _service.DeleteRequest(requests);
            await _service.SaveChangesAsync();

            return Ok();
        }
    }
}