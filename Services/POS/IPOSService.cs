using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface IPOSService
    {
         Task InsertAsync(POS pos);
         Task<POS> FindAsync(int id);
         Task<IPagedList<POS>> FindByBranchAsync(int id);
         bool ValidatePOS(int id);
         Task SaveChangesAsync();
         Task Update(POS pos);
         Task Delete(POS pos);
         Task<POSAutoPopulateFields> FindPosAutoPopulate(int id);
    }
}