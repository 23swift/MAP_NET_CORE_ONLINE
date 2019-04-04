using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface IReturnRemarksService
    {
         Task<Remark> FindAsync(int id);    
         Task<IPagedList<Remark>> FindByRequestAsync(int id, int status); 
         Task<Remark> FindLastRemarksAsync(int id, int status);  //FindByRequestStatus2Async
         Task InsertRemarksAsync(Remark remark);
         Task SaveChangesAsync();
         Task Update(Remark remark);
         Task<string> CheckRemarkAsync(int id, string user);
         Task<Remark> GetAnyLastRemarkAsync(int id, int status);
         

    }
}