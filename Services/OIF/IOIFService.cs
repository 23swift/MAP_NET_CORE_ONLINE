using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface IOIFService
    {
         Task InsertAsync(OIF oif);
         Task<OIF> FindAsync(int id);
         Task<OIF> FindByBranchAsync(int id);
         bool ValidateOIF(int id);
         Task SaveChangesAsync();
         void Update(OIF oif);
         void Delete(OIF oif);
    }
}