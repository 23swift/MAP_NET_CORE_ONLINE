using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Controllers
{
    [Route("/api/approveWithExceptDetails")]
    public class ApproveWithExceptDetailsController : Controller
    {
        private readonly IApproveWithExceptDetailsService approveWithExceptDetailsService;
        private readonly IMapper mapper;
        public ApproveWithExceptDetailsController(IApproveWithExceptDetailsService approveWithExceptDetailsService, IMapper mapper)
        {
            this.mapper = mapper;
            this.approveWithExceptDetailsService = approveWithExceptDetailsService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetApproveWithExceptDetails(int id)
        {
            var approveWithExceptDetails = await approveWithExceptDetailsService.FindAsyncSpecific(id);

            if (approveWithExceptDetails == null)
                return NotFound();

            return Ok(approveWithExceptDetails);
        }

        [HttpGet("appexlist/{id}")]
        public async Task<IActionResult> GetApproveWithExceptDetailsList(int id)
        {
            var appExList = await approveWithExceptDetailsService.FindByMAEF(id);

            if (appExList == null)
                return NotFound();

            return Ok(appExList);
        }        


        [HttpPost]
        public async Task<IActionResult> CreateApproveWithExceptDetails([FromBody] ApproveWithExceptDetails approveWithExceptDetails)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await approveWithExceptDetailsService.InsertAsync(approveWithExceptDetails);
            await approveWithExceptDetailsService.SaveChangesAsync();

            return Ok(approveWithExceptDetails);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateApproveWithExceptDetails([FromBody] ApproveWithExceptDetailsViewModel appEx, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentAppEx = await approveWithExceptDetailsService.FindAsyncSpecific(id);
            if (currentAppEx == null)
                return NotFound();

            mapper.Map<ApproveWithExceptDetailsViewModel, ApproveWithExceptDetails>(appEx, currentAppEx);
            await approveWithExceptDetailsService.Update(currentAppEx);
            await approveWithExceptDetailsService.SaveChangesAsync();

            return Ok(currentAppEx);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApproveWithExceptDetails(int id)
        {
            var currentAppEx = await approveWithExceptDetailsService.FindAsyncSpecific(id);

            if (currentAppEx == null)
                return NotFound();

            await approveWithExceptDetailsService.Delete(currentAppEx);
            await approveWithExceptDetailsService.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("appexlistMqr/{id}")]
        public async Task<IActionResult> GetApproveWithExceptDetailsListMqr(int id)
        {
            var maef = await approveWithExceptDetailsService.GetMaefIdByNewAffId(id);
            if (maef == null)
                return NotFound();

            var appReqList = await approveWithExceptDetailsService.FindByMAEF(maef.Id);

            if (appReqList == null)
                return NotFound();

            return Ok(appReqList);
        }


    }
}