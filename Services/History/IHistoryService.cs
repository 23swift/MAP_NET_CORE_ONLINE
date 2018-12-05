using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;

namespace MAP_Web.Services
{
    public interface IHistoryService
    {
         Task<IEnumerable<History>> FindByRequestAsync(int id);
    }
}