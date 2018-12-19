using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface ISignatoriesService
    {
         Task InsertAsync(Signatories signatory);
         Task<Signatories> FindAsync(int id);
         Task<IPagedList<Signatories>> FindByCustomerAsync(int id);
         Task SaveChangesAsync();
         Task Update(Signatories signatory);
         Task Delete(Signatories signatory);
    }
}