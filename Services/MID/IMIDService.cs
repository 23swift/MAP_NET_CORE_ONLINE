using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Services
{
    public interface IMIDService
    {
        Task InsertAsync(MID mid);
        Task<MID> FindAsync(int id);
        Task<IPagedList<MID>> FindByBranchAsync(int id);
        Task SaveChangesAsync();
        void SaveChanges();
        Task Update(MID mid);
        Task Delete(MID mid);
        Task SaveMid(string value, int id);
        Task SaveTid(string value, int id);
        Task<bool> ValidateMIDCount(int id);
        Task<bool> ValidateAndInsertMidAsync(MID mid);
        Task<bool> ValidateAndUpdateMidAsync(MIDViewModel mid, int id);
        Task<IList<string>> FindExistingMonitorCodesAsync(IList<MID> mids);
        Task<IList<string>> FindDefaultMonitorCodesAsync();
    }
}