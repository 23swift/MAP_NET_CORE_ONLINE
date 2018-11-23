using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class OIFService : IOIFService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<OIF> oifRepo;

        private readonly IRepository<Branch> branchRepo;

        public OIFService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.oifRepo = this.unitOfWork.GetRepository<OIF>();
        }
        public async Task InsertAsync(OIF oif)
        {
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

        public void Update(OIF oif)
        {
            oifRepo.Update(oif);
        }

        public void Delete(OIF oif)
        {
            oifRepo.Delete(oif);
        }

        public async Task<OIF> FindByBranchAsync(int id)
        {
            return await oifRepo.GetFirstOrDefaultAsync(predicate: x => x.BranchId == id);
        }
    }
}