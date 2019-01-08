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
        Task SaveMid(string value, int id);
        Task SaveTid(string value, int id);
    }
}