using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Services
{
    public interface IMDCSCheckerDashboardService
    {
        Task<List<DashboardViewModel>> GetListAsync(string field, string sortDirection, int pageIndex, int pageSize, string filter);
        Task<int> GetListCount();
         Task<List<DashboardViewModel>> FilterAsync(FilterCriteriaViewModel criteria);
    }
}