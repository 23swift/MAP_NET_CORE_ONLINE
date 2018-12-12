using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;
using System;

namespace MAP_Web.Controllers
{
    [Route("/api/documentChecklist")]
    public class DocumentChecklistController : Controller
    {
        private readonly IDocumentChecklistService documentChecklistService;
        private readonly IMapper mapper;

        public DocumentChecklistController(IDocumentChecklistService documentChecklistService, IMapper mapper)
        {
            this.mapper = mapper;
            this.documentChecklistService = documentChecklistService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDocumentChecklist(int id)
        {
            var document = await documentChecklistService.FindAsync(id);

            if (document == null)
                return NotFound();

            return Ok(document);
        }

        [HttpGet("newAffiliation/{id}")]
        public async Task<IActionResult> GetDocumentChecklistByNewAffiliation(int id)
        {
            var document = await documentChecklistService.FindByNewAffiliationAsync(id);

            if (document == null)
                return NotFound();

            return Ok(document);
        }

        [HttpGet("download/{id}")]
        public async Task<IActionResult> GetFileToDownload(int id)
        {
            var document = await documentChecklistService.FindAsync(id);

            if (document == null)
                return NotFound();

            return Ok(document.fileUpload);
        }

        [HttpGet("validate/{id}")]
        public async Task<IActionResult> ValidateDocuments(int id)
        {
            bool isValid = await documentChecklistService.ValidateDocuments(id);

            return Ok(isValid);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDocumentChecklist([FromBody] DocumentChecklist document)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await documentChecklistService.InsertAsync(document);
            await documentChecklistService.SaveChangesAsync();

            return Ok(document);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDocumentChecklist([FromBody] DocumentChecklistViewModel document, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var doc = await documentChecklistService.FindAsync(id);
            document.submittedBy = document.submitted ? "Test User" : "";

            if (doc == null)
                return NotFound();

            mapper.Map<DocumentChecklistViewModel, DocumentChecklist>(document, doc);

            documentChecklistService.Update(doc);
            await documentChecklistService.SaveChangesAsync();

            return Ok(document);
        }

        [HttpPut("{id}/{documentId}")]
        public async Task<IActionResult> AddDocumentToRequest(int id, int documentId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await documentChecklistService.InsertToRequestAsync(id, documentId);
            await documentChecklistService.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("document/{id}")]
        public async Task<IActionResult> DeleteDocument(int id, [FromBody] Object obj)
        {
            var document = await documentChecklistService.FindAsync(id);
            
            if (document == null)
                return NotFound();

            document.fileUpload = null;
            documentChecklistService.Update(document);
            await documentChecklistService.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocument(int id)
        {
            var currentDocument = await documentChecklistService.FindAsync(id);

            if (currentDocument == null)
                return NotFound();

            documentChecklistService.Delete(currentDocument);
            await documentChecklistService.SaveChangesAsync();

            return Ok();
        }
    }
}