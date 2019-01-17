using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface IAwrMaefFormService
    {
        Task<AwrMaef> FindByMAEF(int id);
        Task<MAEF> GetMaefIdByNewAffId(int id);
        Task<AwrMaef> FindAsyncSpecific(int id);
        Task InsertAwrDataAsync(int Id);
        Task InsertAsync(AwrMaef awrMaef);
        void Update(AwrMaef awrMaef);
        void Delete(AwrMaef awrMaef);
        Task RemoveAppExAwrDetails(int id);
        // Task<bool> Validate(int id);
        Task SaveChangesAsync();
    }
}