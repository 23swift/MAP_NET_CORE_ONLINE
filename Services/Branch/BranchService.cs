using System;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class BranchService : IBranchService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Branch> branchRepo;
        private readonly IRepository<History> historyRepo;
        public BranchService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.branchRepo = this.unitOfWork.GetRepository<Branch>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
        }

        public async Task InsertAsync(Branch branch)
        {
            branch.MIDs = new Collection<MID>();
            branch.MIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "OTC",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = false,
                serviceFeeRate = "99.99",
                status = 1
            });
            branch.MIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "REGULAR INSTALLMENT",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = true,
                serviceFeeRate = "0",
                status = 1
            });
            branch.MIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "Installment Zero",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = true,
                serviceFeeRate = "0",
                status = 1
            });
            branch.MIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "BNPL Reg",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = true,
                serviceFeeRate = "0",
                status = 1
            });
            branch.MIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "0% BNPL",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = true,
                serviceFeeRate = "0",
                status = 1
            });

            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "Branch: " + branch.dbaName + "'s Added",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId
            });
            await branchRepo.InsertAsync(branch);
        }

        public async Task<Branch> FindAsync(int id)
        {
            return await branchRepo.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public async void Update(Branch branch)
        {
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "Branch: " + branch.dbaName + "'s Updated",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId
            });

            branchRepo.Update(branch);
        }

        public async void Delete(Branch branch)
        {
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "Branch: " + branch.dbaName + "'s Deleted",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId
            });
            branchRepo.Delete(branch);
        }

        public async Task<IPagedList<Branch>> FindByNewAffiliationAsync(int id)
        {
            return await branchRepo.GetPagedListAsync(predicate: x => x.NewAffiliationId == id);
        }
    }
}