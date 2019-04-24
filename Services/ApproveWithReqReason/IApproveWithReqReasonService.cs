using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface IApproveWithReqReasonService
    {
        Task InsertAsync(ApproveWithReqReason approveWithReqReason);
        Task<IPagedList<ApproveWithReqReason>> FindByMAEF(int id);

        Task<ApproveWithReqReason> FindAsyncSpecific(int id);

        Task SaveChangesAsync();
        Task Update(ApproveWithReqReason approveWithReqReason);
        Task Delete(ApproveWithReqReason approveWithReqReason);
        Task<MAEF> GetMaefIdByNewAffId(int id);
    }
}