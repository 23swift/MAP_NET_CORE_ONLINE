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
         void Update(MAEF maef);

         Task InsertRemarksAsync(History history);

        Task<History> FindRemarksAsync(int id);

         
    }
}