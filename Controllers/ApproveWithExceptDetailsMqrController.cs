using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;


namespace MAP_Web.Controllers
{
    [Route("/api/approveWithExceptDetailsMqr")]
    public class ApproveWithExceptDetailsMqrController : Controller
    {
        private readonly IApproveWithExceptDetailsMqrService _service;
        private readonly IMapper mapper;
        public ApproveWithExceptDetailsMqrController(IApproveWithExceptDetailsMqrService _service, IMapper mapper)
        {
            this.mapper = mapper;
            this._service = _service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetApproveWithExceptDetails(int id)
        {
            var appExMqr = await _service.FindAsyncSpecific(id);

            if (appExMqr == null)
                return NotFound();

            return Ok(appExMqr);
        }

        [HttpGet("appexlist/{id}")]
        public async Task<IActionResult> GetApproveWithExceptDetailsList(int id)
        {
            var appExMqrList = await _service.FindByMAEF(id);

            if (appExMqrList == null)
                return NotFound();

            return Ok(appExMqrList);
        }


        [HttpPost]
        public async Task<IActionResult> CreateApproveWithExceptDetails([FromBody] ApproveWithExceptDetailsMqr appExMqr)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _service.InsertAsync(appExMqr);
            await _service.SaveChangesAsync();

            return Ok(appExMqr);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateApproveWithExceptDetails([FromBody] ApproveWithExceptDetailsMqrViewModel appEx, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentAppEx = await _service.FindAsyncSpecific(id);
            if (currentAppEx == null)
                return NotFound();

            mapper.Map<ApproveWithExceptDetailsMqrViewModel, ApproveWithExceptDetailsMqr>(appEx, currentAppEx);

            await _service.SaveChangesAsync();

            return Ok(currentAppEx);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApproveWithExceptDetails(int id)
        {
            var currentAppEx = await _service.FindAsyncSpecific(id);

            if (currentAppEx == null)
                return NotFound();

            _service.Delete(currentAppEx);
            await _service.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("appexlistMqr/{id}")]
        public async Task<IActionResult> GetApproveWithExceptDetailsListMqr(int id)
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