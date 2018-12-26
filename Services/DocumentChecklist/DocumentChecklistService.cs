using System;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class DocumentChecklistService : IDocumentChecklistService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<DocumentChecklist> documentRepo;
        private readonly IRepository<History> historyRepo;
        public DocumentChecklistService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.documentRepo = this.unitOfWork.GetRepository<DocumentChecklist>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
        }
        public async Task InsertAsync(DocumentChecklist documentChecklist)
        {
            await documentRepo.InsertAsync(documentChecklist);
        }

        public async Task InsertToRequestAsync(int id, int documentId)
        {
            var document = new DocumentChecklist {
                NewAffiliationId = id,
                documentName = documentId
            };

            await documentRepo.InsertAsync(document);
        }

        public async Task<DocumentChecklist> FindAsync(int id)
        {
            return await documentRepo.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public async Task Update(DocumentChecklist documentChecklist)
        {
            // DocumentChecklist.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Document: " + documentChecklist.documentName + " Updated",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = documentChecklist.NewAffiliationId,
                AuditLogGroupId = documentChecklist.AuditLogGroupId
            });

            documentRepo.Update(documentChecklist);
        }
        
        public async Task Delete(DocumentChecklist documentChecklist)
        {
            // DocumentChecklist.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Document: " + documentChecklist.documentName + " Deleted",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = documentChecklist.NewAffiliationId,
                AuditLogGroupId = documentChecklist.AuditLogGroupId
            });

            documentRepo.Delete(documentChecklist);
        }

        public async Task<IPagedList<DocumentChecklist>> FindByNewAffiliationAsync(int id)
        {
            return await documentRepo.GetPagedListAsync(predicate: x => x.NewAffiliationId == id);
        }

        public async Task<bool> ValidateDocuments(int id)
        {
            var docs = await FindByNewAffiliationAsync(id);
            bool isValid = true;

            foreach (var item in docs.Items)
            {
                if (item.submitted == false && item.targetDateOfSubmission == null) {
                    isValid = false;
                }    
            }

            return isValid;
        }
    }
}