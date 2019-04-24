using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Controllers
{
    [Route("/api/approveWithExceptDetailsAwr")]
    public class ApproveWithExceptDetailsAwrController : Controller
    {
        private readonly IApproveWithExceptDetailsAwrService _service;
        private readonly IMapper mapper;
        public ApproveWithExceptDetailsAwrController(IApproveWithExceptDetailsAwrService _service, IMapper mapper)
        {
            this.mapper = mapper;
            this._service = _service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetApproveWithExceptDetails(int id)
        {
            var appExAwr = await _service.FindAsyncSpecific(id);

            if (appExAwr == null)
                return NotFound();

            return Ok(appExAwr);
        }

        [HttpGet("appexlist/{id}")]
        public async Task<IActionResult> GetApproveWithExceptDetailsList(int id)
        {
            var appExAwrList = await _service.FindByMAEF(id);

            if (appExAwrList == null)
                return NotFound();

            return Ok(appExAwrList);
        }


        [HttpPost]
        public async Task<IActionResult> CreateApproveWithExceptDetails([FromBody] ApproveWithExceptDetailsAwr appExAwr)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _service.InsertAsync(appExAwr);
            await _service.SaveChangesAsync();

            return Ok(appExAwr);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateApproveWithExceptDetails([FromBody] ApproveWithExceptDetailsAwrViewModel appEx, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentAppEx = await _service.FindAsyncSpecific(id);
            if (currentAppEx == null)
                return NotFound();

            mapper.Map<ApproveWithExceptDetailsAwrViewModel, ApproveWithExceptDetailsAwr>(appEx, currentAppEx);
            await _service.Update(currentAppEx);
            await _service.SaveChangesAsync();

            return Ok(currentAppEx);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApproveWithExceptDetails(int id)
        {
            var currentAppEx = await _service.FindAsyncSpecific(id);

            if (currentAppEx == null)
                return NotFound();

            await _service.Delete(currentAppEx);
            await _service.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("appexlistAwr/{id}")]
        public async Task<IActionResult> GetApproveWithExceptDetailsListAwr(int id)
        {
            var maef = await _service.GetMaefIdByNewAffId(id);
            if (maef == null)
                return NotFound();

            var appReqList = await _service.FindByMAEF(maef.Id);

            if (appReqList == null)
                return NotFound();

            return Ok(appReqList);
        }

    }

}