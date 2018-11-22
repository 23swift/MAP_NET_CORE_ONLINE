using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface IParameterMaintenanceService
    {
        Task<MaintenanceMaster> FindMasterAsync(int id);
        Task<IPagedList<MaintenanceMaster>> GetMasterAsync();
        Task InsertMasterAsync(MaintenanceMaster maintenanceMaster);
        void UpdateMaster(MaintenanceMaster maintenanceMaster);
        void DeleteMaster(MaintenanceMaster maintenanceMaster);
        Task<IPagedList<MaintenanceMaster>> FindDetailsAsync(int masterId);
        Task InsertDetailsAsync(MaintenanceMaster maintenanceMaster, MaintenanceDetails maintenanceDetails);
        void UpdateDetails(MaintenanceMaster maintenanceMaster, MaintenanceDetails maintenanceDetails);
        void DeleteDetails(MaintenanceMaster maintenanceMaster, MaintenanceDetails maintenanceDetails);
        Task SaveChangesAsync();
    }
}