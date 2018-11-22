using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class DocumentChecklistService : IDocumentChecklistService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<DocumentChecklist> documentRepo;
        public DocumentChecklistService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.documentRepo = this.unitOfWork.GetRepository<DocumentChecklist>();
        }
        public async Task InsertAsync(DocumentChecklist documentChecklist)
        {
            await documentRepo.InsertAsync(documentChecklist);
        }

        public async Task InsertToRequestAsync(int id, int documentId)
        {
            var document = new DocumentChecklist {
                NewAffiliationId = id,
                documentName = documentId.ToString()
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

        public void Update(DocumentChecklist documentChecklist)
        {
            documentRepo.Update(documentChecklist);
        }
        
        public void Delete(DocumentChecklist documentChecklist)
        {
            documentRepo.Delete(documentChecklist);
        }

        public async Task<IPagedList<DocumentChecklist>> FindByNewAffiliationAsync(int id)
        {
            return await documentRepo.GetPagedListAsync(predicate: x => x.NewAffiliationId == id);
        }
    }
}