using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface IApproveWithExceptDetailsService
    {
         Task InsertAsync(ApproveWithExceptDetails approveWithExceptDetails);
         Task<IPagedList<ApproveWithExceptDetails>> FindByMAEF(int id);

         Task<ApproveWithExceptDetails> FindAsyncSpecific(int id);         

         Task SaveChangesAsync();
         void Update(ApproveWithExceptDetails approveWithExceptDetails);
         void Delete(ApproveWithExceptDetails approveWithExceptDetails);          
    }
}