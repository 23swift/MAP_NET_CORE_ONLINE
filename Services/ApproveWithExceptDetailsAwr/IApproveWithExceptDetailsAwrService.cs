using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface IApproveWithExceptDetailsAwrService
    {
        Task<MAEF> GetMaefIdByNewAffId(int id);
        Task<IPagedList<ApproveWithExceptDetailsAwr>> FindByMAEF(int id);
        Task<ApproveWithExceptDetailsAwr> FindAsyncSpecific(int id);
        Task InsertAsync(ApproveWithExceptDetailsAwr appExAwr);
        void Update(ApproveWithExceptDetailsAwr appExAwr);
        void Delete(ApproveWithExceptDetailsAwr appExAwr);
        Task SaveChangesAsync();
    }
}