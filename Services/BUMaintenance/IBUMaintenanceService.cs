using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MAP_Web.Models;

namespace MAP_Web.Services
{
    public interface IBUMaintenanceService
    {
        Task<BUMaintenance> FindById(int id);
        Task<IPagedList<BUMaintenance>> GetBUMaintenanceList();
        Task Insert(BUMaintenance buMaintenance);
        void Update(BUMaintenance buMaintenance);
        void Delete(BUMaintenance buMaintenance);
        Task SaveChangesAsync();
    }
}