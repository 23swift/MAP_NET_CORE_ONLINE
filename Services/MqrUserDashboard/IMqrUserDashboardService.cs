using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;
using MAP_Web.Models.ViewModels;
using System.Collections.Generic;

namespace MAP_Web.Services
{
    public interface IMqrUserDashboardService
    {
        Task<List<DashboardViewModel>> FindAsync();
        Task InsertMAEFDataAsync(int Id);
        Task InsertMQRDataAsync(int Id);
        Task SaveChangesAsync();
    }
}