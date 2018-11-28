using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class CustomerProfileService : ICustomerProfileService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<CustomerProfile> customerRepo;
        private readonly IRepository<Request> requestRepo;
        private readonly IRepository<DocumentList> documentListRepo;
        public CustomerProfileService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.customerRepo = this.unitOfWork.GetRepository<CustomerProfile>();
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.documentListRepo = this.unitOfWork.GetRepository<DocumentList>();
        }
        public async Task InsertAsync(CustomerProfile customerProfile)
        {
            Request request = new Request();
            request.Status = 1;
            request.NewAffiliation = new NewAffiliation();
            request.NewAffiliation.CustomerProfile = customerProfile;

            var documents = await this.documentListRepo.GetPagedListAsync(predicate: d => d.Code == customerProfile.ownership);

            foreach (var item in documents.Items)
            {
                request.NewAffiliation.DocumentChecklists.Add(new DocumentChecklist {
                    documentName = item.Id
                });
            }
            
            await requestRepo.InsertAsync(request);
        }

        public async Task<CustomerProfile> FindAsync(int id)
        {
            // return await customerRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == id, include: c => c.Include(cp => cp.NewAffiliation.Request));
            return await customerRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public void Update(CustomerProfile customerProfile)
        {
            customerRepo.Update(customerProfile);
        }

        public void Delete(CustomerProfile customerProfile)
        {
            customerRepo.Delete(customerProfile);
        }

        public async Task<CustomerProfile> FindByRequestAsync(int id)
        {
            return await customerRepo.GetFirstOrDefaultAsync(predicate: x => x.NewAffiliationId == id);
        }
    }
}