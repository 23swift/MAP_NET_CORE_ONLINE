using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface IReturnRemarksService
    {
         Task<Remark> FindAsync(int id);    
         Task<IPagedList<Remark>> FindByRequestAsync(int id); 
         Task<int> FindLastRemarksAsync(int id);    
    }
}