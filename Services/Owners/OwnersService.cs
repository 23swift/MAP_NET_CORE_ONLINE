using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace MAP_Web.Services
{
    public class OwnersService : UserIdentity, IOwnersService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Owners> ownersRepo;
        private readonly IRepository<Branch> branchRepo;
        private readonly IRepository<History> historyRepo;
        private readonly IRepository<CustomerProfile> customerRepo;
        public OwnersService(IUnitOfWork unitOfWork, IHttpContextAccessor claims) : base(claims)
        {
            this.unitOfWork = unitOfWork;
            this.ownersRepo = this.unitOfWork.GetRepository<Owners>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
            this.customerRepo = this.unitOfWork.GetRepository<CustomerProfile>();
            this.branchRepo = this.unitOfWork.GetRepository<Branch>();
        }

        public async Task InsertAsync(Owners owner)
        {
            var customer = customerRepo.GetFirstOrDefault(predicate: c => c.Id == owner.CustomerProfileId);
            owner.AuditLogGroupId = customer.AuditLogGroupId;

            // CustomerProfile.NewAffiliationId is the same with Request.Id

            historyRepo.Insert(new History{
                date = DateTime.Now,
                action = "Owner: " + owner.name + "'s Details Added",
                groupCode = role,
                user = user,
                RequestId = customer.NewAffiliationId,
                AuditLogGroupId = customer.AuditLogGroupId
            });

            await ownersRepo.InsertAsync(owner);
        }

        public async Task<Owners> FindAsync(int id)
        {
            return await ownersRepo.FindAsync(id);
        }

        public async Task<IPagedList<Owners>> FindByCustomerAsync(int id)
        {
            return await ownersRepo.GetPagedListAsync(predicate: x => x.CustomerProfileId == id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public async Task Update(Owners owner)
        {
            var customer = await customerRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == owner.CustomerProfileId);

            // CustomerProfile.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Owner: " + owner.name + "'s Details Updated",
                groupCode = role,
                user = user,
                RequestId = customer.NewAffiliationId,
                AuditLogGroupId = customer.AuditLogGroupId
            });
            ownersRepo.Update(owner);
        }

        public async Task Delete(Owners owner)
        {
            
            var customer = await customerRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == owner.CustomerProfileId);

            // CustomerProfile.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Owner: " + owner.name + " Deleted",
                groupCode = role,
                user = user,
                RequestId = customer.NewAffiliationId,
                AuditLogGroupId = customer.AuditLogGroupId
            });

            ownersRepo.Delete(owner);
        }
    }
}