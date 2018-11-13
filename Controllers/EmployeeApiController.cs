using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MAP_NET_CORE_ONLINE.Services;
using MAP_Web.Models;


namespace MAP_Web.Controllers
{

   [Route("api/[controller]")]
  public class EmployeeController : Controller
  {
    IEmployeeService _employeeService;
    ILogger<EmployeeController> _logger;

    public EmployeeController(ILogger<EmployeeController> logger, IEmployeeService employeeService)
    {
      _logger = logger;
      _employeeService=employeeService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Employee>> Get(int? _pageIndex,int? _pageSize)
    {
      try
      {
        List<Employee> result;
        // if (_pageIndex!=null && _pageSize!=null){
        //  result= _employeeService.GetPaged(_pageIndex.Value,_pageSize.Value).ToList();
        // }else{result=_employeeService.Get().ToList();}
        //  result= _employeeService.Get().ToList();
        result=_employeeService.Get().ToList();
        return result;
        //return Ok();
      }
      catch (Exception)
      {
        _logger.LogError("Failed to execute GET");
        return BadRequest();
      }
    }
     [HttpGet("GetPaged")]
    public ActionResult<EmployeePaged> GetPaged(int? _pageIndex,int? _pageSize, string sortedBy,string direction)
    {
      try
      {
        // Thread.Sleep(3000);
        return _employeeService.GetPaged(_pageIndex.Value,_pageSize.Value,sortedBy,direction);
        //return Ok();
      }
      catch (Exception)
      {
        _logger.LogError("Failed to execute GET");
        return BadRequest();
      }
    }

    [HttpPost]
    public IActionResult Post([FromBody] Employee model)
    {
      try
      {
        Thread.Sleep(5000);
        // throw new Exception("test Error");
        _employeeService.Create(model);
        return Created("", null);
      }
      catch (Exception)
      {
        _logger.LogError("Failed to execute POST");
        return BadRequest();
      }
    }

    [HttpPut]
    public IActionResult Put([FromBody] Employee model)
    {
      try
      {
        return Ok();
      }
      catch (Exception)
      {
        _logger.LogError("Failed to execute PUT");
        return BadRequest();
      }
    }

    [HttpDelete]
    public IActionResult Delete(int id)
    {
      try
      {
        return Ok();
      }
      catch (Exception)
      {
        _logger.LogError("Failed to execute DELETE");
        return BadRequest();
      }
    }
  }
}