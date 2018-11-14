using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class BranchService : IBranchService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Branch> branchRepo;
        public BranchService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.branchRepo = this.unitOfWork.GetRepository<Branch>();
        }

        public async Task InsertAsync(Branch branch)
        {
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

        public void Update(Branch branch)
        {
            branchRepo.Update(branch);
        }

        public void Delete(Branch branch)
        {
            branchRepo.Delete(branch);
        }

        public async Task<IPagedList<Branch>> FindByCustomerAsync(int id)
        {
            return await branchRepo.GetPagedListAsync(predicate: x => x.CustomerProfileId == id);
        }
    }
}