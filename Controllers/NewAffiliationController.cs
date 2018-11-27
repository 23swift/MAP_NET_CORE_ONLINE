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
            newAffiliationService.UpdateRequest(request);
            await newAffiliationService.SaveChangesAsync();

            return Ok();
        }
    }
}