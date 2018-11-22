using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class BUMaintenanceService : IBUMaintenanceService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<BUMaintenance> _buMaintenanceRepo;
        public BUMaintenanceService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _buMaintenanceRepo = _unitOfWork.GetRepository<BUMaintenance>();
        }
        public async Task<BUMaintenance> FindById(int id)
        {
            return await _buMaintenanceRepo.FindAsync(id);
        }
        public async Task<IPagedList<BUMaintenance>> GetBUMaintenanceList()
        {
            return await _buMaintenanceRepo.GetPagedListAsync();
        }
        public async Task Insert(BUMaintenance buMaintenance)
        {
            await _buMaintenanceRepo.InsertAsync(buMaintenance);
        }
        public void Update(BUMaintenance buMaintenance)
        {
            _buMaintenanceRepo.Update(buMaintenance);
        }
        public void Delete(BUMaintenance buMaintenance)
        {
            _buMaintenanceRepo.Delete(buMaintenance);
        }
        public async Task SaveChangesAsync()
        {
            await _unitOfWork.SaveChangesAsync();
        }
    }
}