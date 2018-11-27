using System.Threading.Tasks;
using MAP_Web.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MAP_Web.Controllers
{
    [Route("/api/DocumentList")]
    public class DocumentListController : Controller
    {
        IDocumentListService _documentListService;
        ILogger<DocumentListController> _logger;

        public DocumentListController(ILogger<DocumentListController> logger, IDocumentListService documentListService)
        {
            _documentListService = documentListService;
            _logger = logger;
        }

        [HttpGet("{code}")]
        public async Task<IActionResult> GetDocumentList(string code)
        {
            try
            {
                var result = await _documentListService.GetDocumentList(code);
                return Ok(result);
            }
            catch (System.Exception)
            {
                _logger.LogError("Failed to execute GET");
                return BadRequest();
            }
        }
    }
}