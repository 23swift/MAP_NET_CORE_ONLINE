using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Controllers
{
    [Route("/api/customerProfile")]
    public class CustomerProfileController : Controller
    {
        private readonly ICustomerProfileService customerProfileService;
        private readonly IMapper mapper;
        public CustomerProfileController(ICustomerProfileService customerProfileService, IMapper mapper)
        {
            this.mapper = mapper;
            this.customerProfileService = customerProfileService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomerProfile(int id)
        {
            var customer = await customerProfileService.FindAsync(id);

            if (customer == null)
                return NotFound();

            return Ok(customer);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCustomerProfile([FromBody] CustomerProfile customer)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await customerProfileService.InsertAsync(customer);
            await customerProfileService.SaveChangesAsync();

            return Ok(new { id = customer.Id, newAffiliationId = customer.NewAffiliationId});
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomerProfile([FromBody] CustomerProfileViewModel customer, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var cust = await customerProfileService.FindAsync(id);

            if (cust == null)
                return NotFound();

            mapper.Map<CustomerProfileViewModel, CustomerProfile>(customer, cust);

            customerProfileService.Update(cust);
            await customerProfileService.SaveChangesAsync();

            return Ok();
        }
    }
}