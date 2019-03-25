using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MAP_Web.DataAccess;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class HistoryService : IHistoryService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Request> requestRepo;
        private readonly AuditLog_Context loggerContext;
        private readonly IRepository<History> historyRepo;
        private readonly IMapper mapper;
        public HistoryService(IUnitOfWork unitOfWork, IMapper mapper, AuditLog_Context loggerContext)
        {
            this.loggerContext = loggerContext;
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
        }
        public async Task<IEnumerable<HistoryViewModel>> FindByRequestAsync(int id)
        {
            var request = await requestRepo.GetFirstOrDefaultAsync(predicate: r => r.Id == id,
                                                            include: r => r.Include(rr => rr.History));

            List<HistoryViewModel> historyVm = new List<HistoryViewModel>();
            mapper.Map<IEnumerable<History>, List<HistoryViewModel>>(request.History, historyVm);
            return historyVm;
        }

        public async Task<IEnumerable<ChangeLog>> FindDetailedByRequestAsync(int id)
        {
            var request = await requestRepo.FindAsync(id);
            var detailedHistory = loggerContext.ChangeLogs.Where(c => c.AuditLogGroupId == request.AuditLogGroupId);

            return detailedHistory;
        }

        public async Task<IEnumerable<ChangeLog>> FindDetailedByHistoryIdAsync(int id)
        {
            var detailedHistory =  loggerContext.ChangeLogs.Where(c => c.HistoryId == id);

            return detailedHistory;
        }

        public async Task InsertAsync(History history)
        {
            await historyRepo.InsertAsync(history);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }
    }
}