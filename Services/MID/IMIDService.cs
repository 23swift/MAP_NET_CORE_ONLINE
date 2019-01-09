using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

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
        Task<bool> ValidateMIDCount(int id);
        IList<string> FindExistingMonitorCodes(IList<MID> mids);
    }
}