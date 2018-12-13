using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public interface ITerminalDetailsService
    {
         Task InsertAsync(TerminalDetails terminalDetails);
         Task<TerminalDetails> FindAsync(int id);
         Task<IPagedList<TerminalDetails>> FindByPosAsync(int id);
         Task SaveChangesAsync();
         Task Update(TerminalDetails terminalDetails);
         Task Delete(TerminalDetails terminalDetails);
    }
}