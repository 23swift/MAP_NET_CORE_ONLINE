using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface IApproveWithReqReasonMqrService
    {
        Task<MAEF> GetMaefIdByNewAffId(int id);
        Task<IPagedList<ApproveWithReqReasonMqr>> FindByMAEF(int id);
        Task<ApproveWithReqReasonMqr> FindAsyncSpecific(int id);
        Task InsertAsync(ApproveWithReqReasonMqr appReqMqr);
        Task Update(ApproveWithReqReasonMqr appReqMqr);
        Task Delete(ApproveWithReqReasonMqr appReqMqr);
        Task SaveChangesAsync();
    }
}