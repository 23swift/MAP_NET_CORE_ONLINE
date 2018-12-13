using System.Threading.Tasks;
using MAP_Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace MAP_Web.Controllers
{
    [Route("api/newAffiliation")]
    public class NewAffiliationController : Controller
    {
        private readonly INewAffiliationService newAffiliationService;
        public NewAffiliationController(INewAffiliationService newAffiliationService)
        {
            this.newAffiliationService = newAffiliationService;
        }

        [HttpPut("aoEncoder/{id}")]
        public async Task<IActionResult> UpdateRequestForAoEncoder(int id)
        {
            var request = await newAffiliationService.FindAsync(id);
            await newAffiliationService.UpdateRequest(request, 2);
            await newAffiliationService.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("returnToAoEncoder/{id}")]
        public async Task<IActionResult> ReturnToAoEncoder(int id)
        {
            var request = await newAffiliationService.FindAsync(id);
            await newAffiliationService.UpdateRequest(request, 1);
            await newAffiliationService.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("aoChecker/{id}")]
        public async Task<IActionResult> UpdateRequestForAoChecker(int id)
        {
            var request = await newAffiliationService.FindAsync(id);
            await newAffiliationService.UpdateRequest(request, 3);
            await newAffiliationService.SaveChangesAsync();

            return Ok();
        }
    }
}