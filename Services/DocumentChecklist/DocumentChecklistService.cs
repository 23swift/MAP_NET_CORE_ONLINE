using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace MAP_Web.Services
{
    public class DocumentChecklistService : UserIdentity, IDocumentChecklistService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<DocumentChecklist> documentRepo;
        private readonly IRepository<History> historyRepo;

        public DocumentChecklistService(IUnitOfWork unitOfWork, IHttpContextAccessor claims) : base(claims)
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
            var docu = await documentRepo.GetFirstOrDefaultAsync(predicate: c => c.NewAffiliationId == id);
            var HistoryGroupId = Guid.NewGuid();
            var document = new DocumentChecklist {
                NewAffiliationId = id,
                documentName = documentId,
                AuditLogGroupId = docu.AuditLogGroupId,
                HistoryGroupId = HistoryGroupId
            };
            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Document: " + id + " Added",   //documentChecklist.documentName
                groupCode = role,
                user = user,
                RequestId = docu.NewAffiliationId,
                AuditLogGroupId = docu.AuditLogGroupId,
                HistoryGroupId = HistoryGroupId
            });            



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
            documentChecklist.HistoryGroupId = Guid.NewGuid();
            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Document: " + documentChecklist.documentName + " Updated",
                groupCode = role,
                user = user,
                RequestId = documentChecklist.NewAffiliationId,
                AuditLogGroupId = documentChecklist.AuditLogGroupId,
                HistoryGroupId = documentChecklist.HistoryGroupId
            });

            documentRepo.Update(documentChecklist);
        }
        
        public async Task Delete(DocumentChecklist documentChecklist)
        {
            // DocumentChecklist.NewAffiliationId is the same with Request.Id
            documentChecklist.HistoryGroupId = Guid.NewGuid();
            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Document: " + documentChecklist.documentName + " Deleted",
                groupCode = role,
                user = user,
                RequestId = documentChecklist.NewAffiliationId,
                AuditLogGroupId = documentChecklist.AuditLogGroupId,
                HistoryGroupId = documentChecklist.HistoryGroupId
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
                if (item.submitted == false && item.targetDateOfSubmission == null && item.withTempoWaiver == false) {
                    isValid = false;
                }    
            }

            return isValid;
        }
    }
}