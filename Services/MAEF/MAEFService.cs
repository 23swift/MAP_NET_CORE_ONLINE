using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.AspNetCore.Http;

namespace MAP_Web.Services
{
    public class MAEFService : UserIdentity, IMAEFService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<MAEF> maefRepo;

        private readonly IRepository<Request> requestRepo;

        private readonly IRepository<History> historyRepo;

        private readonly IRepository<RequiredApproval> requiredApprovalRepo;

        public MAEFService(IUnitOfWork unitOfWork, IHttpContextAccessor claims) : base(claims)
        {
            this.unitOfWork = unitOfWork;
            this.maefRepo = this.unitOfWork.GetRepository<MAEF>();
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
            this.requiredApprovalRepo = this.unitOfWork.GetRepository<RequiredApproval>();
        }

        public async Task InsertAsync(MAEF maef)
        {
             await maefRepo.InsertAsync(maef);
        }

        public async Task<MAEF> FindAsync(int id)
        {
            var maef = await maefRepo.GetFirstOrDefaultAsync(predicate: r => r.RequestId == id);
            return (maef);
        }

        public async Task<MAEF> FindAsyncMaefId(int id)
        {
            var maef = await maefRepo.GetFirstOrDefaultAsync(predicate: r => r.Id == id);
            return (maef);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public async Task Update(MAEF maef)
        {
            var maefData = await requestRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == maef.RequestId);
            maef.AuditLogGroupId = maefData.AuditLogGroupId;
            maef.HistoryGroupId = Guid.NewGuid();

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "MAEF Details Updated",
                groupCode = role,
                user = user,
                RequestId = maefData.Id,
                AuditLogGroupId = maefData.AuditLogGroupId,
                HistoryGroupId = maef.HistoryGroupId
            }); 

            maefRepo.Update(maef);
        }

        public async Task InsertRemarksAsync(History history)
        {
            await historyRepo.InsertAsync(history);
        }

        public async Task<History> FindRemarksAsync(int id, string action)
        {
           // var history = await historyRepo.GetPagedListAsync(orderBy:d => d.OrderByDescending(dd => dd.Id), predicate: d => d.RequestId == id && d.actionCode.Contains(action));

          //  return history.Items.First();
              var history = await historyRepo.GetFirstOrDefaultAsync(orderBy:d => d.OrderByDescending(dd => dd.Id), predicate: d => d.RequestId == id && d.actionCode.Contains(action));
              return (history);
        }

        public async Task<History> CheckRemarksAsync(int id, string action)
        {
            var history = await historyRepo.GetFirstOrDefaultAsync(predicate: r => r.RequestId == id && r.actionCode.Contains(action));
            return (history);
        }

     /*   public void UpdateRequest(Request request, int maefId)
        {
            request.MAEFId = maefId;
            requestRepo.Update(request);
        } */

        public async Task InsertRequiredApprovalAsync(RequiredApproval requiredApproval)
        {
             await requiredApprovalRepo.InsertAsync(requiredApproval);
        }


    }
}