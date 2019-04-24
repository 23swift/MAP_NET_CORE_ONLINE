using System.Threading.Tasks;
using MAP_Web.Services;
using MAP_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MAP_Web.Models.ViewModels;
using System;



using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace MAP_Web.Controllers
{
    [Route("/api/documentChecklist")]
    public class DocumentChecklistController : Controller
    {
        private readonly IDocumentChecklistService documentChecklistService;
        private readonly IMapper mapper;
        private readonly string name;
        public DocumentChecklistController(IDocumentChecklistService documentChecklistService, IMapper mapper, IHttpContextAccessor claims)
        {
            this.mapper = mapper;
            this.documentChecklistService = documentChecklistService;

            name = claims.HttpContext.User.Claims.ToList().SingleOrDefault(c => c.Type == "name").Value;            
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
            document.submittedBy = document.submitted ? name : "";

            if (doc == null)
                return NotFound();

            mapper.Map<DocumentChecklistViewModel, DocumentChecklist>(document, doc);

            await documentChecklistService.Update(doc);
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
            await documentChecklistService.Update(document);
            await documentChecklistService.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocumentChecklist(int id)
        {
            var currentDocument = await documentChecklistService.FindAsync(id);

            if (currentDocument == null)
                return NotFound();

            await documentChecklistService.Delete(currentDocument);
            await documentChecklistService.SaveChangesAsync();

            return Ok();
        }
    }
}