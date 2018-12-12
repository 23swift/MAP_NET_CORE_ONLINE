using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;

namespace MAP_Web.Services
{
    public interface IDropdownService
    {
        Task<MaintenanceMaster> GetDropdown(string code);
        Task<List<MaintenanceDetails>> GetTerminalModel(string brandCode);
    }
}