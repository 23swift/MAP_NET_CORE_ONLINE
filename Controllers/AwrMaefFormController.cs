using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Controllers
{
    [Route("/api/awrMaefForm")]
    public class AwrMaefFormController : Controller
    {
        private readonly IAwrMaefFormService _service;
        private readonly IMapper mapper;

        public AwrMaefFormController(IAwrMaefFormService _service, IMapper mapper)
        {
            this.mapper = mapper;
            this._service = _service;
        }

        [HttpPost("getAwrMaefFormData/{id}")]
        public async Task<IActionResult> GetAwrMaefDataAsync(int id)
        {
            await _service.InsertAwrDataAsync(id);
            await _service.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("getById/{id}")]
        public async Task<IActionResult> getById(int id)
        {
            var maef = await _service.GetMaefIdByNewAffId(id);

            if (maef == null)
                return NotFound();

            var awrMaef = await _service.FindByMAEF(maef.Id);

            if (awrMaef == null)
                return NotFound();

            return Ok(awrMaef);
        }

        [HttpGet("getMaefId/{id}")]
        public async Task<IActionResult> getMaefId(int id)
        {
            var maef = await _service.GetMaefIdByNewAffId(id);

            return Ok(maef.Id);
        }

        [HttpPost("create")]
        public async Task<IActionResult> InsertAsync([FromBody] AwrMaef awrMaef)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _service.InsertAsync(awrMaef);
            await _service.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("update/{id}")]
        public async Task<IActionResult> update(int id,[FromBody] AwrMaefViewModel awrMaef)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentAwrMaef = await _service.FindAsyncSpecific(id);

            if (currentAwrMaef == null)
                return NotFound();

            mapper.Map<AwrMaefViewModel, AwrMaef>(awrMaef, currentAwrMaef);

            await _service.SaveChangesAsync();
            return Ok(currentAwrMaef);
        }

        [HttpDelete("deleteAwrMaef/{id}")]
        public async Task<IActionResult> deleteAwrMaef(int id, [FromBody] AwrMaefViewModel awrMaef)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentAwrMaef = await _service.FindAsyncSpecific(id);

            if (currentAwrMaef == null)
                return NotFound();

            var dataAwrMaef = mapper.Map<AwrMaefViewModel, AwrMaef>(awrMaef, currentAwrMaef);
            _service.Delete(dataAwrMaef);

            await _service.SaveChangesAsync();
            return Ok(currentAwrMaef);
        }

        [HttpDelete("removeAppExAwrDetails/{id}")]
        public async Task<IActionResult> RemoveAppExAwrDetails(int id)
        {
            await _service.RemoveAppExAwrDetails(id);
            await _service.SaveChangesAsync();
            return Ok();
        }

        // [HttpGet("validate/{id}")]
        // public async Task<IActionResult> ValidateIfHasAwrMaef(int id)
        // {
        //     var isValid = _service.Validate(id);
        //     return Ok(isValid);
        // }
    }
}