using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Controllers
{
    [Route("/api/signatories")]
    public class SignatoriesController : Controller
    {
        private readonly ISignatoriesService signatoriesService;
        private readonly IMapper mapper;
        public SignatoriesController(ISignatoriesService signatoriesService, IMapper mapper)
        {
            this.mapper = mapper;
            this.signatoriesService = signatoriesService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSignatories(int id)
        {
            var signatory = await signatoriesService.FindAsync(id);

            if (signatory == null)
                return NotFound();

            return Ok(signatory);
        }

        [HttpGet("customer/{id}")]
        public async Task<IActionResult> GetSignatoriePerCustomer(int id)
        {
            var signatory = await signatoriesService.FindByCustomerAsync(id);

            if (signatory == null)
                return NotFound();

            return Ok(signatory);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSignatories([FromBody] Signatories signatories)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await signatoriesService.InsertAsync(signatories);
            await signatoriesService.SaveChangesAsync();

            return Ok(signatories);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSignatories([FromBody] SignatoriesViewModel signatories, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentSigna = await signatoriesService.FindAsync(id);

            if (currentSigna == null)
                return NotFound();

            mapper.Map<SignatoriesViewModel, Signatories>(signatories, currentSigna);

            await signatoriesService.SaveChangesAsync();


            return Ok(currentSigna);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSignatories(int id)
        {
            var currentSigna = await signatoriesService.FindAsync(id);

            if (currentSigna == null)
                return NotFound();

            signatoriesService.Delete(currentSigna);
            await signatoriesService.SaveChangesAsync();

            return Ok();
        }
    }
}