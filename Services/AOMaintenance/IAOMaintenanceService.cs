using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MAP_Web.Models;

namespace MAP_Web.Services
{
    public interface IAOMaintenanceService
    {
        Task<IEnumerable<AOMaintenance>> GetAOMaintenanceList();
        Task<AOMaintenance> GetByUserName(string UserName);
    }
}