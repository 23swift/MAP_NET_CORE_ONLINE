using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Controllers
{
    [Route("/api/terminalDetails")]
    public class TerminalDetailsController : Controller
    {
        private readonly ITerminalDetailsService terminalDetailsService;
        private readonly IMapper mapper;

        public TerminalDetailsController(ITerminalDetailsService terminalDetailsService, IMapper mapper)
        {
            this.mapper = mapper;
            this.terminalDetailsService = terminalDetailsService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTerminalDetails(int id)
        {
            var terminal = await terminalDetailsService.FindAsync(id);

            if (terminal == null)
                return NotFound();

            return Ok(terminal);
        }

        [HttpGet("pos/{id}")]
        public async Task<IActionResult> GetTerminalDetailsByPos(int id)
        {
            var terminal = await terminalDetailsService.FindByPosAsync(id);

            if (terminal == null)
                return Ok();

            return Ok(terminal);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTerminalDetails([FromBody] TerminalDetails terminal)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await terminalDetailsService.InsertAsync(terminal);
            await terminalDetailsService.SaveChangesAsync();

            return Ok(terminal);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTerminalDetails([FromBody] TerminalDetailsViewModel terminal, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentTerminal = await terminalDetailsService.FindAsync(id);

            if (currentTerminal == null)
                return NotFound();

            mapper.Map<TerminalDetailsViewModel, TerminalDetails>(terminal, currentTerminal);

            await terminalDetailsService.SaveChangesAsync();

            return Ok(currentTerminal);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTerminalDetails(int id)
        {
            var currentTerminal = await terminalDetailsService.FindAsync(id);

            if (currentTerminal == null)
                return NotFound();

            terminalDetailsService.Delete(currentTerminal);
            await terminalDetailsService.SaveChangesAsync();

            return Ok();
        }
    }
}