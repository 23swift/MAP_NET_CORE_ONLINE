using System.Threading.Tasks;
using System.Linq;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class DropdownService : IDropdownService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<MaintenanceMaster> masterRepo;
        public DropdownService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.masterRepo = this.unitOfWork.GetRepository<MaintenanceMaster>();
        }

        public async Task<MaintenanceMaster> GetOwnership() 
        {
            var details = await masterRepo.GetFirstOrDefaultAsync(predicate: m => m.Code == "OW", include: m => m.Include(y => y.MaintenanceDetails));

            return details;
        }

        public async Task<MaintenanceMaster> GetDbaCity() 
        {
            var details = await masterRepo.GetFirstOrDefaultAsync(predicate: m => m.Code == "CY", include: m => m.Include(y => y.MaintenanceDetails));

            return details;
        }
        
        public async Task<MaintenanceMaster> GetZipCode() 
        {
            var ownership = await masterRepo.GetFirstOrDefaultAsync(predicate: m => m.Code == "ZC", include: m => m.Include(y => y.MaintenanceDetails));

            return ownership;
        }
    }
}