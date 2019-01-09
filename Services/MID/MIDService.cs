using System;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;

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

            await historyRepo.InsertAsync(new History
            {
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

            await historyRepo.InsertAsync(new History
            {
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

            await historyRepo.InsertAsync(new History
            {
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

<<<<<<< HEAD
        public IList<string> FindExistingMonitorCodes(IList<MID> mids)
        {
            IList<string> midList = new List<string>();

            foreach (var mid in mids)
                midList.Add(mid.monitorCode);

            return midList;
=======
        public async Task SaveMid(string value, int id)
        {
            var currentMid = midRepo.Find(id);
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == currentMid.BranchId);
            
            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "MID -" + "''" + value +"''" + "for Branch: " + branch.dbaName + " Has been Added",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId
            });

            currentMid.merchId = value;
            midRepo.Update(currentMid);
        }

        public async Task SaveTid(string value, int id)
        {
            var currentTid = midRepo.Find(id);
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == currentTid.BranchId);

            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "DebitTID -" + "''" + value + "''" + "for Branch: " + branch.dbaName + " Has been Added",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId
            });

            currentTid.tid = value;
            midRepo.Update(currentTid);
>>>>>>> 19fc30f7eacf9108a69a80c4e0f0bfef8ec92280
        }
    }
}