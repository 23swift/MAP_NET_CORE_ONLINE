using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface IApproveWithExceptDetailsMqrService
    {
        Task<MAEF> GetMaefIdByNewAffId(int id);
        Task<IPagedList<ApproveWithExceptDetailsMqr>> FindByMAEF(int id);
        Task<ApproveWithExceptDetailsMqr> FindAsyncSpecific(int id);
        Task InsertAsync(ApproveWithExceptDetailsMqr appExMqr);
        Task Update(ApproveWithExceptDetailsMqr appExMqr);
        Task Delete(ApproveWithExceptDetailsMqr appExMqr);
        Task SaveChangesAsync();
    }
}