using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class ParameterMaintenanceService : IParameterMaintenanceService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<MaintenanceMaster> _maintenanceMasterRepo;
        private readonly IRepository<MaintenanceDetails> _maintenanceDetailsRepo;

        public ParameterMaintenanceService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _maintenanceMasterRepo = _unitOfWork.GetRepository<MaintenanceMaster>();
            _maintenanceDetailsRepo = _unitOfWork.GetRepository<MaintenanceDetails>();
        }
        public async Task<MaintenanceMaster> FindMasterAsync(int id)
        {
            return await _maintenanceMasterRepo.FindAsync(id);
        }
        public async Task<IPagedList<MaintenanceMaster>> GetMasterAsync()
        {
            return await _maintenanceMasterRepo.GetPagedListAsync();
        }
        public async Task InsertMasterAsync(MaintenanceMaster maintenanceMaster)
        {
            await _maintenanceMasterRepo.InsertAsync(maintenanceMaster);
        }
        public void UpdateMaster(MaintenanceMaster maintenanceMaster)
        {
            _maintenanceMasterRepo.Update(maintenanceMaster);
        }
        public void DeleteMaster(MaintenanceMaster maintenanceMaster)
        {
            _maintenanceMasterRepo.Delete(maintenanceMaster);
        }
        public async Task<IPagedList<MaintenanceMaster>> FindDetailsAsync(int masterId)
        {
            return await _maintenanceMasterRepo.GetPagedListAsync(predicate: x => x.Id == masterId, include: y => y.Include(z => z.MaintenanceDetails));
        }
        public async Task InsertDetailsAsync(MaintenanceMaster maintenanceMaster, MaintenanceDetails maintenanceDetails)
        {
            await Task.FromResult(maintenanceMaster);
        }
        public void UpdateDetails(MaintenanceMaster maintenanceMaster, MaintenanceDetails maintenanceDetails)
        {
            throw new NotImplementedException();
        }
        public void DeleteDetails(MaintenanceMaster maintenanceMaster, MaintenanceDetails maintenanceDetails)
        {
            throw new NotImplementedException();
        }
        public async Task SaveChangesAsync()
        {
            await _unitOfWork.SaveChangesAsync();
        }


    }
}