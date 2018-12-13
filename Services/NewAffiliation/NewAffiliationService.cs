using System;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class NewAffiliationService : INewAffiliationService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Request> requestRepo;
        private readonly IRepository<History> historyRepo;

        public NewAffiliationService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
        }

        public async Task<Request> FindAsync(int id)
        {
            return await requestRepo.FindAsync(id);
        }
        public async Task UpdateRequest(Request request, int status)
        {
            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "Request Submitted",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = request.Id
            });

            request.Status = status;
            requestRepo.Update(request);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }
    }
}