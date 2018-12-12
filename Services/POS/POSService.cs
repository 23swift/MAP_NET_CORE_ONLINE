using System;
using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class POSService : IPOSService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<POS> posRepo;
        private readonly IRepository<NewAffiliation> newAffRepo;
        private readonly IRepository<History> historyRepo;
        private readonly IRepository<Branch> branchRepo;
        public POSService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.posRepo = this.unitOfWork.GetRepository<POS>();
            this.newAffRepo = this.unitOfWork.GetRepository<NewAffiliation>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
            this.branchRepo = this.unitOfWork.GetRepository<Branch>();
        }
        public async Task InsertAsync(POS pos)
        {
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == pos.BranchId);
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "POS for Branch: " + branch.dbaName + " Added",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId
            });
            await posRepo.InsertAsync(pos);
        }

        public async Task<POS> FindAsync(int id)
        {
            return await posRepo.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public async void Update(POS pos)
        {
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == pos.BranchId);
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "POS for Branch: " + branch.dbaName + " Updated",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId
            });
            posRepo.Update(pos);
        }

        public async void Delete(POS pos)
        {
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == pos.BranchId);
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "POS for Branch: " + branch.dbaName + " Deleted",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId
            });
            posRepo.Delete(pos);
        }

        public async Task<IPagedList<POS>> FindByBranchAsync(int id)
        {
            return await posRepo.GetPagedListAsync(predicate: x => x.BranchId == id);
        }

        public bool ValidatePOS(int id)
        {
            bool isValid = true;
            var newAff = newAffRepo.GetFirstOrDefault(predicate: x => x.Id == id, include: x => x.Include(y => y.Branches).ThenInclude(b => b.POS));

            foreach (var item in newAff.Branches)
            {
                if (item.POS.Count == 0)
                    isValid = false;
            }

            return isValid;
        }

        public async Task<POSAutoPopulateFields> FindPosAutoPopulate(int id)
        {
            var branch = await branchRepo.GetFirstOrDefaultAsync(predicate: b => b.Id == id,
                                        include: b => b.Include(bb => bb.OIF)
                                            .Include(r => r.NewAffiliation)
                                                .ThenInclude(r => r.CustomerProfile));
            
            POSAutoPopulateFields pos = new POSAutoPopulateFields {
                approvedBy = "",
                businessUnitAO = "",
                requestersBusinessUnit = "",
                businessSignage = branch.OIF.businessSignage,
                merchantDBAName = branch.dbaName,
                merchantDbaAddress = branch.dbaAddress1,
                merchantDbaCity = branch.dbaCity,
                merchantLegalName = branch.NewAffiliation.CustomerProfile.legalName,
                nsp = "",
                segment = ""
            };

            return pos;
        }
    }
}