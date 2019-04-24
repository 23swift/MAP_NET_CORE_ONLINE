using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Controllers
{
    [Route("/api/approveWithReqReason")]
    public class ApproveWithReqReasonController : Controller
    {
        private readonly IApproveWithReqReasonService approveWithReqReasonService;
        private readonly IMapper mapper;
        public ApproveWithReqReasonController(IApproveWithReqReasonService approveWithReqReasonService, IMapper mapper)
        {
            this.mapper = mapper;
            this.approveWithReqReasonService = approveWithReqReasonService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetApproveWithReqReason(int id)
        {
            var approveWithReqReason = await approveWithReqReasonService.FindAsyncSpecific(id);

            if (approveWithReqReason == null)
                return NotFound();

            return Ok(approveWithReqReason);
        }

        [HttpGet("appreqlist/{id}")]
        public async Task<IActionResult> GetAppReqList(int id)
        {
            var appReqList = await approveWithReqReasonService.FindByMAEF(id);

            if (appReqList == null)
                return NotFound();

            return Ok(appReqList);
        }


        [HttpPost]
        public async Task<IActionResult> CreateApproveWithReqReason([FromBody] ApproveWithReqReason approveWithReqReason)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await approveWithReqReasonService.InsertAsync(approveWithReqReason);
            await approveWithReqReasonService.SaveChangesAsync();

            return Ok(approveWithReqReason);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateApproveWithReqReason([FromBody] ApproveWithReqReasonViewModel appReq, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentAppReq = await approveWithReqReasonService.FindAsyncSpecific(id);
            if (currentAppReq == null)
                return NotFound();

            mapper.Map<ApproveWithReqReasonViewModel, ApproveWithReqReason>(appReq, currentAppReq);
            await approveWithReqReasonService.Update(currentAppReq);
            await approveWithReqReasonService.SaveChangesAsync();

            return Ok(currentAppReq);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApproveWithReqReason(int id)
        {
            var currentAppReq = await approveWithReqReasonService.FindAsyncSpecific(id);

            if (currentAppReq == null)
                return NotFound();

            await approveWithReqReasonService.Delete(currentAppReq);
            await approveWithReqReasonService.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("appreqlistMqr/{id}")]
        public async Task<IActionResult> GetAppReqListMqr(int id)
        {
            var maef = await approveWithReqReasonService.GetMaefIdByNewAffId(id);
            if (maef == null)
                return NotFound();

            var appReqList = await approveWithReqReasonService.FindByMAEF(maef.Id);

            if (appReqList == null)
                return NotFound();

            return Ok(appReqList);
        }
    }
}