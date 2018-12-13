using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace MAP_Web.Controllers
{
    [Route("/api/history")]
    public class HistoryController : Controller
    {
        private readonly IHistoryService historyService;
        public HistoryController(IHistoryService historyService)
        {
            this.historyService = historyService;
        }

        [HttpGet("request/{id}")]
        public async Task<IActionResult> GetByRequestAsync(int id)
        {
            var history = await historyService.FindByRequestAsync(id);

            if (history == null)
                return NotFound();

            return Ok(history);
        }

        [HttpPost]
        public async Task<IActionResult> CreateHistory([FromBody] History history)
        {
            if (!ModelState.IsValid)
            return BadRequest(ModelState);

            await historyService.InsertAsync(history);
            await historyService.SaveChangesAsync();

            return Ok(history);
        }
    }
}