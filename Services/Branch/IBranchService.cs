using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface IBranchService
    {
         Task InsertAsync(Branch branch);
         Task<Branch> FindAsync(int id);
         Task<IPagedList<Branch>> FindByNewAffiliationAsync(int id);
         Task SaveChangesAsync();
         Task Update(Branch branch);
         Task Delete(Branch branch);
    }
}