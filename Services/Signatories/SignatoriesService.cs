using System;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class SignatoriesService : ISignatoriesService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Signatories> signatoriesRepo;
        private readonly IRepository<History> historyRepo;
        private readonly IRepository<CustomerProfile> customerRepo;
        public SignatoriesService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.signatoriesRepo = this.unitOfWork.GetRepository<Signatories>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
            this.customerRepo = this.unitOfWork.GetRepository<CustomerProfile>();
        }
        public async Task InsertAsync(Signatories signatory)
        {
            var customer = customerRepo.GetFirstOrDefault(predicate: c => c.Id == signatory.CustomerProfileId);

            // CustomerProfile.NewAffiliationId is the same with Request.Id

            historyRepo.Insert(new History{
                date = DateTime.Now,
                action = "Signatory: " + signatory.name + "'s Details Added",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = customer.NewAffiliationId
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

        public void Update(Signatories signatory)
        {
            var customer = customerRepo.GetFirstOrDefault(predicate: c => c.Id == signatory.CustomerProfileId);

            // CustomerProfile.NewAffiliationId is the same with Request.Id

            historyRepo.Insert(new History{
                date = DateTime.Now,
                action = "Signatory: " + signatory.name + "'s Details Updated",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = customer.NewAffiliationId
            });
            
            signatoriesRepo.Update(signatory);
        }

        public void Delete(Signatories signatory)
        {
            var customer = customerRepo.GetFirstOrDefault(predicate: c => c.Id == signatory.CustomerProfileId);

            // CustomerProfile.NewAffiliationId is the same with Request.Id

            historyRepo.Insert(new History{
                date = DateTime.Now,
                action = "Signatory: " + signatory.name + "'s Details Deleted",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = customer.NewAffiliationId
            });

            signatoriesRepo.Delete(signatory);
        }
    }
}