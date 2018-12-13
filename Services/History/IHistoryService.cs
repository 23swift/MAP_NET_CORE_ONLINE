using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;

namespace MAP_Web.Services
{
    public interface IHistoryService
    {
         Task<IEnumerable<HistoryViewModel>> FindByRequestAsync(int id);

         Task InsertAsync(History history);

         Task SaveChangesAsync();
    }
}