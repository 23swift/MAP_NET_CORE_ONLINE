using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Services
{
    public interface IMDMDashboardService
    {
         Task<List<DashboardViewModel>> FindAsync();
         Task<List<DashboardViewModel>> FilterAsync(FilterCriteriaViewModel criteria);
    }
}