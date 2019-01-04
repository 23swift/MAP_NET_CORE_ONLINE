using System;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace MAP_Web.Services
{
    public class NewAffiliationService : INewAffiliationService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Request> requestRepo;
        private readonly IRepository<POS> posRepo;
        private readonly IRepository<History> historyRepo;

        public NewAffiliationService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.posRepo = this.unitOfWork.GetRepository<POS>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
        }

        public async Task<Request> FindAsync(int id)
        {
            return await requestRepo.FindAsync(id);
        }


        public async Task<Request> FindWithNavigationAsync(int id)
        {
            return await requestRepo.GetFirstOrDefaultAsync(predicate: r => r.Id == id, include: r => r.Include(rr => rr.NewAffiliation)
                                                                                        .ThenInclude(rr => rr.Branches));
        }

        public bool ValidateFieldsForMdcs(Request request)
        {
            bool isValid = true;
            foreach (var item in request.NewAffiliation.Branches) {
                if (item.taxCode == null) {
                    isValid = false;
                    break;
                }
            }

            return isValid;
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

        public async Task<IEnumerable<Branch>> FindPosByRequestAsync(int id)
        {
            var request = await requestRepo.GetFirstOrDefaultAsync(predicate: r => r.Id == id, include: r => r.Include(rr => rr.NewAffiliation)
                                                                                                                .ThenInclude(n => n.Branches)
                                                                                                                    .ThenInclude(b => b.POS));

            return request.NewAffiliation.Branches;
        }

        public void UpdatePOSForMdcsChecker(IEnumerable<Branch> Branches)
        {
            foreach (var branch in Branches)
            {
                foreach (var pos in branch.POS)
                {
                    pos.dateAndTimeEndorsedToMAU = DateTime.Now;

                    posRepo.Update(pos);
                }
            }
        }
    }
}