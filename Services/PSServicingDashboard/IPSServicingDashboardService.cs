using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Services
{
    public interface IPSServicingDashboardService
    {
        Task<List<PSServicingDashboardViewModel>> FindAsync();
        Task<List<DashboardViewModel>> FindRequestAsync();
    }
}