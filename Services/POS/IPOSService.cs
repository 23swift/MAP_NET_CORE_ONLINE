using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface IPOSService
    {
         Task InsertAsync(POS pos);
         Task<POS> FindAsync(int id);
         Task<IPagedList<POS>> FindByBranchAsync(int id);
         Task SaveChangesAsync();
         void Update(POS pos);
         void Delete(POS pos);
    }
}