using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;
namespace MAP_Web.Services
{
    public interface IMAEFService
    {
         Task InsertAsync(MAEF maef);
         Task<MAEF> FindAsync(int id);
         Task<MAEF> FindAsyncMaefId(int id);


       //  void UpdateRequest(Request request, int maefId);

         Task SaveChangesAsync();
         Task Update(MAEF maef);

         Task InsertRemarksAsync(History history);

        Task<History> FindRemarksAsync(int id, string action);

        Task<History> CheckRemarksAsync(int id, string action);

        Task InsertRequiredApprovalAsync(RequiredApproval requiredApproval);

         
    }
}