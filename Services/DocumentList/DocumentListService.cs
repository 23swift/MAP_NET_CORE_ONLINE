using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class DocumentListService : IDocumentListService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<DocumentList> documentListRepo;

        public DocumentListService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.documentListRepo = this.unitOfWork.GetRepository<DocumentList>();
        }

        public async Task<DocumentList> GetDocumentList(string code)
        {
            var result = await documentListRepo.GetFirstOrDefaultAsync(predicate: x => x.Code == code);
            return result;
        }
    }
}