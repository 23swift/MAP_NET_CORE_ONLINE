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

        public async Task<MaintenanceMaster> GetDropdown(string code)
        {
            var details = await masterRepo.GetFirstOrDefaultAsync(predicate: m => m.Code == code, include: m => m.Include(y => y.MaintenanceDetails));

            return details;
        }

        // public async Task<ServiceFeeContract> GetServiceFeeContract

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
            var details = await masterRepo.GetFirstOrDefaultAsync(predicate: m => m.Code == "ZC", include: m => m.Include(y => y.MaintenanceDetails));

            return details;
        }

        public async Task<MaintenanceMaster> GetSpecialMailingCity()
        {
            var details = await masterRepo.GetFirstOrDefaultAsync(predicate: m => m.Code == "CY", include: m => m.Include(y => y.MaintenanceDetails));

            return details;
        }

        public async Task<MaintenanceMaster> GetSpecialMailingZipCode()
        {
            var details = await masterRepo.GetFirstOrDefaultAsync(predicate: m => m.Code == "ZC", include: m => m.Include(y => y.MaintenanceDetails));

            return details;
        }

        // NOT EXISTING
        public async Task<MaintenanceMaster> GetMcc()
        {
            var details = await masterRepo.GetFirstOrDefaultAsync(predicate: m => m.Code == "MCC", include: m => m.Include(y => y.MaintenanceDetails));

            return details;
        }

        // NOT EXISTING
        public async Task<MaintenanceMaster> GetStrategicMerchant()
        {
            var details = await masterRepo.GetFirstOrDefaultAsync(predicate: m => m.Code == "SM", include: m => m.Include(y => y.MaintenanceDetails));

            return details;
        }

        public async Task<MaintenanceMaster> GetDefaultTransactionSource()
        {
            var details = await masterRepo.GetFirstOrDefaultAsync(predicate: m => m.Code == "MTSRC", include: m => m.Include(y => y.MaintenanceDetails));

            return details;
        }

        public async Task<MaintenanceMaster> GetAreaMallCode()
        {
            var details = await masterRepo.GetFirstOrDefaultAsync(predicate: m => m.Code == "MALLS", include: m => m.Include(y => y.MaintenanceDetails));

            return details;
        }

        // NOT EXISTING
        public async Task<MaintenanceMaster> GetFraudToolProvider()
        {
            var details = await masterRepo.GetFirstOrDefaultAsync(predicate: m => m.Code == "FTP", include: m => m.Include(y => y.MaintenanceDetails));

            return details;
        }

        public async Task<MaintenanceMaster> GetGatewayIntegrationType()
        {
            var details = await masterRepo.GetFirstOrDefaultAsync(predicate: m => m.Code == "CY", include: m => m.Include(y => y.MaintenanceDetails));

            return details;
        }

        public async Task<MaintenanceMaster> GetTaxType()
        {
            var details = await masterRepo.GetFirstOrDefaultAsync(predicate: m => m.Code == "TT", include: m => m.Include(y => y.MaintenanceDetails));

            return details;
        }
    }
}