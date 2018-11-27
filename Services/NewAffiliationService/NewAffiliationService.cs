using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class NewAffiliationService : INewAffiliationService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Request> requestRepo;

        public NewAffiliationService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
        }

        public async Task<Request> FindAsync(int id)
        {
            return await requestRepo.FindAsync(id);
        }
        public void UpdateRequest(Request request)
        {
            request.Status = 2;
            requestRepo.Update(request);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }
    }
}