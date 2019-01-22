using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Controllers
{
    [Route("/api/approveWithReqReasonMqr")]
    public class ApproveWithReqReasonMqrController : Controller
    {
        private readonly IApproveWithReqReasonMqrService appReqMqrService;
        private readonly IMapper mapper;
        public ApproveWithReqReasonMqrController(IApproveWithReqReasonMqrService appReqMqrService, IMapper mapper)
        {
            this.mapper = mapper;
            this.appReqMqrService = appReqMqrService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetApproveWithReqReason(int id)
        {
            var appReqMqr = await appReqMqrService.FindAsyncSpecific(id);

            if (appReqMqr == null)
                return NotFound();

            return Ok(appReqMqr);
        }

        [HttpGet("appreqlist/{id}")]
        public async Task<IActionResult> GetAppReqList(int id)
        {
            var appReqListMqr = await appReqMqrService.FindByMAEF(id);

            if (appReqListMqr == null)
                return NotFound();

            return Ok(appReqListMqr);
        }


        [HttpPost]
        public async Task<IActionResult> CreateApproveWithReqReason([FromBody] ApproveWithReqReasonMqr appReqMqr)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await appReqMqrService.InsertAsync(appReqMqr);
            await appReqMqrService.SaveChangesAsync();

            return Ok(appReqMqr);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateApproveWithReqReason([FromBody] ApproveWithReqReasonMqrViewModel appReq, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentAppReq = await appReqMqrService.FindAsyncSpecific(id);
            if (currentAppReq == null)
                return NotFound();

            mapper.Map<ApproveWithReqReasonMqrViewModel, ApproveWithReqReasonMqr>(appReq, currentAppReq);

            await appReqMqrService.SaveChangesAsync();

            return Ok(currentAppReq);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApproveWithReqReason(int id)
        {
            var currentAppReq = await appReqMqrService.FindAsyncSpecific(id);

            if (currentAppReq == null)
                return NotFound();

            appReqMqrService.Delete(currentAppReq);
            await appReqMqrService.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("appreqlistMqr/{id}")]
        public async Task<IActionResult> GetAppReqListMqr(int id)
        {
            var maef = await appReqMqrService.GetMaefIdByNewAffId(id);
            if (maef == null)
                return NotFound();

            var appReqList = await appReqMqrService.FindByMAEF(maef.Id);

            if (appReqList == null)
                return NotFound();

            return Ok(appReqList);
        }
    }
}