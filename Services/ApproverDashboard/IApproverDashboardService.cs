using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Services
{
    public interface IApproverDashboardService
    {
        Task<List<DashboardViewModel>> FindAsync();

        Task<List<DashboardViewModel>> FilterAsync(FilterCriteriaViewModel criteria);   

        Task<List<DashboardViewModel>> GetListAsync(string field, string sortDirection, int pageIndex, int pageSize, string filter);
        Task<int> GetListCount();       
    }
}