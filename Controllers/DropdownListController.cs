using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using MAP_Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace MAP_Web.Controllers
{
    [Route("/api/DropdownList")]
    public class DropdownListController : Controller
    {
        private readonly IDropdownService _service;
        private readonly IMapper mapper;

        public DropdownListController(IDropdownService _service, IMapper mapper)
        {
            this.mapper = mapper;
            this._service = _service;
        }

        [HttpGet("{code}")]
        public async Task<IActionResult> GetDropdown(string code)
        {
             var dropdownvalue = await _service.GetDropdown(code);
            
            //var dropdownvalue=new Models.MaintenanceMaster() ;
            if (dropdownvalue == null)
                return NotFound();

            var detailsList = new List<DropdownViewModel>();
            foreach (var item in dropdownvalue.MaintenanceDetails)
            {
                detailsList.Add(new DropdownViewModel
                {
                    Code = item.Code,
                    Value = item.Value
                }); 
                System.Console.WriteLine(item.Value);
            }
            // var mapped = mapper.Map<ICollection<MaintenanceDetails>, IEnumerable<DropdownViewModel>>(dropdownvalue.MaintenanceDetails);


            return Ok(detailsList);
        }

        [HttpGet("getTerminalModel/{brandCode}")]
        public async Task<IActionResult> GetTerminalModel(string brandCode)
        {
            var dropdownvalue = await _service.GetTerminalModel(brandCode);

            if (dropdownvalue == null)
                return NotFound();

            var detailsList = new List<DropdownViewModel>();
            foreach (var item in dropdownvalue)
            {
                detailsList.Add(new DropdownViewModel
                {
                    Code = item.Code,
                    Value = item.Value
                });
            }
            // var mapped = mapper.Map<ICollection<MaintenanceDetails>, IEnumerable<DropdownViewModel>>(dropdownvalue.MaintenanceDetails);
            return Ok(detailsList);
        }

    }
}