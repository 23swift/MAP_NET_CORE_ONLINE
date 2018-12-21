using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Services
{
    public interface IAoEncoderDashboardService
    {
        Task<List<DashboardViewModel>> GetListAsync(int pageIndex, int pageSize, string filter, bool sortDirection);
        Task<List<DashboardViewModel>> FindAsync();
        void DeleteRequest(Request request);
        Task<Request> FindAsync(int id);
        Task SaveChangesAsync();
    }
}