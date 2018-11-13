using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MAP_NET_CORE_ONLINE.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MAP_Web.Controllers
{
    [Route("api/[controller]")]
    public class AOListModalController : Controller
    {
        IAOListModalService _aoListModalservice;
        ILogger<AOListModalController> _logger;

        public AOListModalController(ILogger<AOListModalController> logger, IAOListModalService aoListModalservice)
        {
            _logger = logger;
            _aoListModalservice = aoListModalservice;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            try
            {
                var result = await _aoListModalservice.Get();
                return Ok(result);
            }
            catch (Exception)
            {
                _logger.LogError("Failed to execute GET");
                return BadRequest();
            }
        }

        [HttpGet("GetByUserName/{userName}")]
        public async Task<ActionResult> GetByUserName(string userName)
        {
            try
            {
                var result = await _aoListModalservice.GetByUserName(userName);
                return Ok(result);
            }
            catch (Exception)
            {
                _logger.LogError("Failed to execute GET");
                return BadRequest();
            }
        }

        [HttpPut("OwnRequest/{Id}/{userId}")]
        public async Task<ActionResult> OwnRequest(int Id, string userId)
        {
            try
            {
                _aoListModalservice.OwnRequest(Id, userId);
                return Ok();
            }
            catch (Exception)
            {
                _logger.LogError("Failed to execute GET");
                return BadRequest();
            }
        }
    }
}