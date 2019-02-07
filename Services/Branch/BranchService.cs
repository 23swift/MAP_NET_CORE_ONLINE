using System;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Xml;
using AspNetCore.Reporting;
using AspNetCore.ReportingServices;

namespace MAP_Web.Services
{
    public class BranchService : IBranchService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Branch> branchRepo;
        private readonly IRepository<History> historyRepo;
        private readonly IRepository<Request> requestRepo;
        private readonly IRepository<CustomerProfile> customerRepo;
        private readonly IRepository<Owners> ownersRepo;
        
        public BranchService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.branchRepo = this.unitOfWork.GetRepository<Branch>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.customerRepo = this.unitOfWork.GetRepository<CustomerProfile>();
            this.ownersRepo = this.unitOfWork.GetRepository<Owners>();
        }

        public async Task InsertAsync(Branch branch)
        {
            var request = await requestRepo.FindAsync(branch.NewAffiliationId);
            branch.AuditLogGroupId = request.AuditLogGroupId;

            branch.MIDs = new Collection<MID>();
            branch.MIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "OTC",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = false,
                serviceFeeRate = 99.99M,
                status = 1,
                AuditLogGroupId = request.AuditLogGroupId
            });
            branch.MIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "REGULAR INSTALLMENT",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = true,
                serviceFeeRate = 0.00M,
                status = 1,
                AuditLogGroupId = request.AuditLogGroupId
            });
            branch.MIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "Installment Zero",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = true,
                serviceFeeRate = 0.00M,
                status = 1,
                AuditLogGroupId = request.AuditLogGroupId
            });
            branch.MIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "BNPL Reg",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = true,
                serviceFeeRate = 0.00M,
                status = 1,
                AuditLogGroupId = request.AuditLogGroupId
            });
            branch.MIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "0% BNPL",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = true,
                serviceFeeRate = 0.00M,
                status = 1,
                AuditLogGroupId = request.AuditLogGroupId
            });

            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "Branch: " + branch.dbaName + "'s Added",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = request.AuditLogGroupId
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

        public async Task Update(Branch branch)
        {
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "Branch: " + branch.dbaName + "'s Updated",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId
            });

            branchRepo.Update(branch);
        }

        public async Task Delete(Branch branch)
        {
            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "Branch: " + branch.dbaName + "'s Deleted",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId
            });
            branchRepo.Delete(branch);
        }

        public async Task<IPagedList<Branch>> FindByNewAffiliationAsync(int id)
        {
            return await branchRepo.GetPagedListAsync(predicate: x => x.NewAffiliationId == id);
        }

        public async Task<bool> ValidateSinglePropOwnership(int id)
        {
            bool isSingleProp = false;
            var branch = await branchRepo.FindAsync(id);

            // Branch.NewAffiliationId === Customer.Id
            var customer = await customerRepo.FindAsync(branch.NewAffiliationId);

            if (customer.ownership == "SP")
            {
                isSingleProp = true;
            }

            return isSingleProp;
        }


        public async Task<Owners> GetFirstOrDefaultOwnerByBranchAsync(int id)
        {
            var branch = await branchRepo.FindAsync(id);

            // Branch.NewAffiliationId === Owners.CustomerProfileId
            var owner = await ownersRepo.GetPagedListAsync(predicate: o => o.CustomerProfileId == branch.NewAffiliationId);

            return owner.Items.FirstOrDefault();
        }

    }
}