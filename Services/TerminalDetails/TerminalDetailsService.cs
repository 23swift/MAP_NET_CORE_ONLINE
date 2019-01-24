using System;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class TerminalDetailsService : ITerminalDetailsService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<TerminalDetails> terminalRepo;
        private readonly IRepository<History> historyRepo;
        private readonly IRepository<POS> posRepo;
        private readonly IRepository<Request> requestRepo;
        public TerminalDetailsService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.terminalRepo = this.unitOfWork.GetRepository<TerminalDetails>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
            this.posRepo = this.unitOfWork.GetRepository<POS>();
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
        }
        public async Task InsertAsync(TerminalDetails terminalDetails)
        {
            var pos = await posRepo.GetFirstOrDefaultAsync(predicate: p => p.Id == terminalDetails.POSId, include: p => p.Include(pp => pp.Branch));
            var branch = pos.Branch;
            var request = await requestRepo.FindAsync(branch.NewAffiliationId);
            terminalDetails.AuditLogGroupId = request.AuditLogGroupId;
            // POS.Branch.NewAffiliationId is the same with Request.Id

            historyRepo.Insert(new History{
                date = DateTime.Now,
                action = "Terminal Details for Branch: " + branch.dbaName + " Added",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = request.AuditLogGroupId
            });
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

        public async Task Update(TerminalDetails terminalDetails)
        {
            var pos = await posRepo.GetFirstOrDefaultAsync(predicate: p => p.Id == terminalDetails.POSId, include: p => p.Include(pp => pp.Branch));
            var branch = pos.Branch;
            // POS.Branch.NewAffiliationId is the same with Request.Id

            historyRepo.Insert(new History{
                date = DateTime.Now,
                action = "MID for Branch: " + branch.dbaName + " Updated",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId
            });
            terminalRepo.Update(terminalDetails);
        }

        public async Task Delete(TerminalDetails terminalDetails)
        {
            var pos = await posRepo.GetFirstOrDefaultAsync(predicate: p => p.Id == terminalDetails.POSId, include: p => p.Include(pp => pp.Branch));
            var branch = pos.Branch;
            // POS.Branch.NewAffiliationId is the same with Request.Id

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "MID for Branch: " + branch.dbaName + " Deleted",
                groupCode = "Test Group Code",
                user = "Test User",
                RequestId = branch.NewAffiliationId,
                AuditLogGroupId = branch.AuditLogGroupId
            });
            terminalRepo.Delete(terminalDetails);
        }

        public async Task<IPagedList<TerminalDetails>> FindByPosAsync(int id)
        {
            return await terminalRepo.GetPagedListAsync(predicate: x => x.POSId == id);
        }
    }
}