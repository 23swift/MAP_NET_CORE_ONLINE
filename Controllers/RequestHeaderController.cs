using System.Threading.Tasks;
using MAP_Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace MAP_Web.Controllers
{
    [Route("/api/requestHeader")]
    public class RequestHeaderController : Controller
    {
        private readonly IRequestHeaderService requestHeaderService;
        public RequestHeaderController(IRequestHeaderService requestHeaderService)
        {
            this.requestHeaderService = requestHeaderService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByRequest(int id)
        {
            var model = await requestHeaderService.FindAsync(id);

            if (model == null)
                return NotFound();

            return Ok(model);
        }
    }
}