using System;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class MIDService : IMIDService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<MID> midRepo;
        private readonly IRepository<Branch> branchRepo;
        private readonly IRepository<History> historyRepo;
        public MIDService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.midRepo = this.unitOfWork.GetRepository<MID>();
            this.branchRepo = this.unitOfWork.GetRepository<Branch>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
        }
        public async Task InsertAsync(MID mid)
        {
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == mid.BranchId);
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "MID for Branch: " + branch.dbaName + " Added",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId
            });
            await midRepo.InsertAsync(mid);
        }

        public async Task<MID> FindAsync(int id)
        {
            return await midRepo.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public async void Update(MID mid)
        {
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == mid.BranchId);
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "MID for Branch: " + branch.dbaName + " Updated",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId
            });
            midRepo.Update(mid);
        }

        public async void Delete(MID mid)
        {
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == mid.BranchId);
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "MID for Branch: " + branch.dbaName + " Deleted",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId
            });
            midRepo.Delete(mid);
        }

        public async Task<IPagedList<MID>> FindByBranchAsync(int id)
        {
            return await midRepo.GetPagedListAsync(predicate: x => x.BranchId == id);
        }
    }
}