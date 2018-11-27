using System.Threading.Tasks;
using MAP_Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace MAP_Web.Controllers
{
    [Route("/api/DropdownList")]
    public class DropdownListController : Controller
    {
        private readonly IDropdownService _service;

        public DropdownListController(IDropdownService _service)
        {
            this._service = _service;
        }

        [HttpGet("{code}")]
        public async Task<IActionResult> GetDropdown(string code)
        {
            var dropdownvalue = await _service.GetDropdown(code);

            if (dropdownvalue == null)
                return NotFound();

            return Ok(dropdownvalue);
        }

    }
}