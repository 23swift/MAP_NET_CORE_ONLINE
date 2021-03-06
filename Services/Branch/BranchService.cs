using System;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Xml;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

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
        private readonly IHttpContextAccessor claims;
        private readonly IList<Claim> identity;
        private readonly string user;
        private readonly string role;
        
        public BranchService(IUnitOfWork unitOfWork, IHttpContextAccessor claims)
        {
            this.unitOfWork = unitOfWork;
            this.branchRepo = this.unitOfWork.GetRepository<Branch>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.customerRepo = this.unitOfWork.GetRepository<CustomerProfile>();
            this.ownersRepo = this.unitOfWork.GetRepository<Owners>();
            this.claims = claims;
            this.identity = claims.HttpContext.User.Claims.ToList();
            this.user = identity.SingleOrDefault(c => c.Type == "name").Value;
           // this.role = identity.SingleOrDefault(c => c.Type == "role").Value;            
            this.role = " ";

            // var id = new ClaimsIdentity(user.Claims, "Forms", "name", "role");
            // var claims = id.Claims.ToList();
        }

        public async Task InsertAsync(Branch branch)
        {
            var request = await requestRepo.FindAsync(branch.NewAffiliationId);
            branch.AuditLogGroupId = request.AuditLogGroupId;
            branch.HistoryGroupId = Guid.NewGuid();

            branch.MIDs = new Collection<MID>();
            branch.MIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "OTC",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = false,
                serviceFeeRate = 99.99M,
                status = 1,
                AuditLogGroupId = request.AuditLogGroupId,
                HistoryGroupId = branch.HistoryGroupId
            });
            branch.MIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "REGULAR INSTALLMENT",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = true,
                serviceFeeRate = 0.00M,
                status = 1,
                AuditLogGroupId = request.AuditLogGroupId,
                HistoryGroupId = branch.HistoryGroupId
            });
            branch.MIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "Installment Zero",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = true,
                serviceFeeRate = 0.00M,
                status = 1,
                AuditLogGroupId = request.AuditLogGroupId,
                HistoryGroupId = branch.HistoryGroupId
            });
            branch.MIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "BNPL Reg",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = true,
                serviceFeeRate = 0.00M,
                status = 1,
                AuditLogGroupId = request.AuditLogGroupId,
                HistoryGroupId = branch.HistoryGroupId
            });
            branch.MIDs.Add(new MID
            {
                currencyPhp = true,
                monitorCode = "0% BNPL",
                cardPlans = "MCVCJCACCC - 1",
                majorPurchase = true,
                serviceFeeRate = 0.00M,
                status = 1,
                AuditLogGroupId = request.AuditLogGroupId,
                HistoryGroupId = branch.HistoryGroupId
            });

            // Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "Branch: " + branch.dbaName + "'s Added",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = request.AuditLogGroupId,
                HistoryGroupId = branch.HistoryGroupId
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
            branch.HistoryGroupId = Guid.NewGuid();
            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "Branch: " + branch.dbaName + "'s Updated",
                groupCode = role,
                user = user,
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId,
                HistoryGroupId = branch.HistoryGroupId
            });

            branchRepo.Update(branch);
        }

        public async Task Delete(Branch branch)
        {
            // Branch.NewAffiliationId is the same with Request.Id
            branch.HistoryGroupId = Guid.NewGuid();
            await historyRepo.InsertAsync(new History
            {
                date = DateTime.Now,
                action = "Branch: " + branch.dbaName + "'s Deleted",
                groupCode = role,
                user = user,
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId,
                HistoryGroupId = branch.HistoryGroupId
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