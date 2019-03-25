using System;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class SignatoriesService : UserIdentity, ISignatoriesService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Signatories> signatoriesRepo;
        private readonly IRepository<History> historyRepo;
        private readonly IRepository<CustomerProfile> customerRepo;
        public SignatoriesService(IUnitOfWork unitOfWork, IHttpContextAccessor claims) : base(claims)
        {
            this.unitOfWork = unitOfWork;
            this.signatoriesRepo = this.unitOfWork.GetRepository<Signatories>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
            this.customerRepo = this.unitOfWork.GetRepository<CustomerProfile>();
        }
        public async Task InsertAsync(Signatories signatory)
        {
            var customer = customerRepo.GetFirstOrDefault(predicate: c => c.Id == signatory.CustomerProfileId);
            signatory.AuditLogGroupId = customer.AuditLogGroupId;

            // CustomerProfile.NewAffiliationId is the same with Request.Id

            historyRepo.Insert(new History{
                date = DateTime.Now,
                action = "Signatory: " + signatory.name + "'s Details Added",
                groupCode = role,
                user = user,
                RequestId = customer.NewAffiliationId,
                AuditLogGroupId = customer.AuditLogGroupId
            });

            await signatoriesRepo.InsertAsync(signatory);
        }

        public async Task<Signatories> FindAsync(int id)
        {
            return await signatoriesRepo.FindAsync(id);
        }

        public async Task<IPagedList<Signatories>> FindByCustomerAsync(int id)
        {
            return await signatoriesRepo.GetPagedListAsync(predicate: x => x.CustomerProfileId == id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public async Task Update(Signatories signatory)
        {
            var customer = await customerRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == signatory.CustomerProfileId);

            // CustomerProfile.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Signatory: " + signatory.name + "'s Details Updated",
                groupCode = role,
                user = user,
                RequestId = customer.NewAffiliationId,
                AuditLogGroupId = customer.AuditLogGroupId
            });
            
            signatoriesRepo.Update(signatory);
        }

        public async Task Delete(Signatories signatory)
        {
            var customer = await customerRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == signatory.CustomerProfileId);

            // CustomerProfile.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Signatory: " + signatory.name + "'s Details Deleted",
                groupCode = role,
                user = user,
                RequestId = customer.NewAffiliationId,
                AuditLogGroupId = customer.AuditLogGroupId
            });

            signatoriesRepo.Delete(signatory);
        }
    }
}