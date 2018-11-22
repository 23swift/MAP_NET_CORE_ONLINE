using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{

    public class AOMaintenanceService : IAOMaintenanceService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<AOMaintenance> _aoMaintenanceRepository;

        public AOMaintenanceService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _aoMaintenanceRepository = _unitOfWork.GetRepository<AOMaintenance>();
        }

        public async Task<IEnumerable<AOMaintenance>> GetAOMaintenanceList()
        {
            var result = _aoMaintenanceRepository.GetPagedList();
            return await result.Items.ToAsyncEnumerable().ToList();
        }

        public async Task<AOMaintenance> GetByUserName(string UserName)
        {
            var result = _aoMaintenanceRepository.FindAsync(UserName);
            return await result;
        }
    }

}