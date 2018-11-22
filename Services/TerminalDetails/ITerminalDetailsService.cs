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
         void Update(TerminalDetails terminalDetails);
         void Delete(TerminalDetails terminalDetails);
    }
}