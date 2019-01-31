using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Services
{
    public interface IAoEncoderDashboardService
    {
        Task<List<DashboardViewModel>> GetListAsync(string field, string sortDirection, int pageIndex, int pageSize, string filter);
        Task<int> GetListCount();
        void DeleteRequest(Request request);
        Task<Request> FindAsync(int id);
        Task SaveChangesAsync();
    }
}