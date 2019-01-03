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
            await newAffiliationService.UpdateRequest(request, 15);
            await newAffiliationService.SaveChangesAsync();

            return Ok();
        }


        [HttpPut("returnToMamo/{id}")]
        public async Task<IActionResult> ReturnToMamo(int id)
        {
            var request = await newAffiliationService.FindAsync(id);
            await newAffiliationService.UpdateRequest(request, 13);
            await newAffiliationService.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("decline/{id}")]
        public async Task<IActionResult> Decline(int id)
        {
            var request = await newAffiliationService.FindAsync(id);
            await newAffiliationService.UpdateRequest(request, 14);
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

        [HttpPut("mdcsEncoder/{id}")]
        public async Task<IActionResult> UpdateRequestForMdcsEncoder(int id)
        {
            var request = await newAffiliationService.FindWithNavigationAsync(id);

            if (request.Status == 3) {
                bool isValid = newAffiliationService.ValidateFieldsForMdcs(request);

                if (!isValid)
                    return BadRequest();
            }
            
            await newAffiliationService.UpdateRequest(request, ++request.Status);
            await newAffiliationService.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("mdcsChecker/{id}")]
        public async Task<IActionResult> UpdateRequestForMdcsChecker(int id)
        {
            var request = await newAffiliationService.FindWithNavigationAsync(id);

            if (request.Status == 3) {
                bool isValid = newAffiliationService.ValidateFieldsForMdcs(request);

                if (!isValid)
                    return BadRequest();
            }
            
            await newAffiliationService.UpdateRequest(request, ++request.Status);
            await newAffiliationService.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("mauOfficer/{id}")]
        public async Task<IActionResult> UpdateRequestForMauOfficer(int id)
        {
            var request = await newAffiliationService.FindAsync(id);

            
            await newAffiliationService.UpdateRequest(request, 6);
            await newAffiliationService.SaveChangesAsync();

            return Ok();
        }
    }
}