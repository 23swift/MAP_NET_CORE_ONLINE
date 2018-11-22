using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class TerminalDetailsService : ITerminalDetailsService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<TerminalDetails> terminalRepo;
        public TerminalDetailsService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.terminalRepo = this.unitOfWork.GetRepository<TerminalDetails>();
        }
        public async Task InsertAsync(TerminalDetails terminalDetails)
        {
            await terminalRepo.InsertAsync(terminalDetails);
        }

        public async Task<TerminalDetails> FindAsync(int id)
        {
            return await terminalRepo.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public void Update(TerminalDetails terminalDetails)
        {
            terminalRepo.Update(terminalDetails);
        }

        public void Delete(TerminalDetails terminalDetails)
        {
            terminalRepo.Delete(terminalDetails);
        }

        public async Task<IPagedList<TerminalDetails>> FindByPosAsync(int id)
        {
            return await terminalRepo.GetPagedListAsync(predicate: x => x.POSId == id);
        }
    }
}