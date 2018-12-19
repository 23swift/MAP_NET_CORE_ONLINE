using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;

namespace MAP_Web.Services
{
    public class OIFService : IOIFService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<OIF> oifRepo;
        private readonly IRepository<Branch> branchRepo;
        private readonly IRepository<NewAffiliation> newAffRepo;
        private readonly IRepository<History> historyRepo;
        private readonly IRepository<Request> requestRepo;

        public OIFService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.oifRepo = this.unitOfWork.GetRepository<OIF>();
            this.branchRepo = this.unitOfWork.GetRepository<Branch>();
            this.newAffRepo = this.unitOfWork.GetRepository<NewAffiliation>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
        }
        public async Task InsertAsync(OIF oif)
        {
            var branch = await branchRepo.FindAsync(oif.BranchId);
            var request = await requestRepo.FindAsync(branch.NewAffiliationId);
            oif.AuditLogGroupId = request.AuditLogGroupId;
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "OIF for Branch: " + oif.dbaName + " Added",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = oif.AuditLogGroupId
            });

            await oifRepo.InsertAsync(oif);
        }

        public async Task<OIF> FindAsync(int id)
        {
            return await oifRepo.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public async Task Update(OIF oif)
        {
            var branch = await branchRepo.FindAsync(oif.BranchId);
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "OIF for Branch: " + oif.dbaName + " Updated",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId
            });
            oifRepo.Update(oif);
        }

        public async void Delete(OIF oif)
        {
            var branch = await branchRepo.FindAsync(oif.BranchId);
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "OIF for Branch: " + oif.dbaName + " Deleted",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId
            });
            oifRepo.Delete(oif);
        }

        public async Task<OIF> FindByBranchAsync(int id)
        {
            return await oifRepo.GetFirstOrDefaultAsync(predicate: x => x.BranchId == id);
        }

        public bool ValidateOIF(int id)
        {
            bool isValid = true;
            var newAff = newAffRepo.GetFirstOrDefault(predicate: x=> x.Id == id, include: x=> x.Include(y => y.Branches).ThenInclude(b=>b.OIF));

            foreach (var item in newAff.Branches)
            {
                if (item.OIF == null)
                    isValid = false;
            }

            return isValid;
        }
    }
}