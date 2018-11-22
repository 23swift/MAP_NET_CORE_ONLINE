using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Services
{
    public interface IAoEncoderDashboardService
    {
         Task<List<DashboardViewModel>> FindAsync();
    }
}