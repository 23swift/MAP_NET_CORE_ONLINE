using System;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId
            });
            await midRepo.InsertAsync(mid);
        }

        public async Task<bool> ValidateMIDCount(int id)
        {
            bool isValid = true;
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == id, include: b => b.Include(bb => bb.MIDs));

            if (branch.MIDs.Count == 10)
            {
                isValid = false;
            }

            return isValid;
        }

        public async Task<MID> FindAsync(int id)
        {
            return await midRepo.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public void SaveChanges()
        {
            unitOfWork.SaveChanges();
        }

        public async Task Update(MID mid)
        {
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == mid.BranchId);
            // Branch.NewAffiliationId is the same with Request.Id

             await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "MID for Branch: " + branch.dbaName + " Updated",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId
            });

            midRepo.Update(mid);
        }

        public async Task Delete(MID mid)
        {
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == mid.BranchId);
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "MID for Branch: " + branch.dbaName + " Deleted",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId
            });
            midRepo.Delete(mid);
        }

        public async Task<IPagedList<MID>> FindByBranchAsync(int id)
        {
            return await midRepo.GetPagedListAsync(predicate: x => x.BranchId == id);
        }
    }
}