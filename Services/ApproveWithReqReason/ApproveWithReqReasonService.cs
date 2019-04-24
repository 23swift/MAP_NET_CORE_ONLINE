using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System;

namespace MAP_Web.Services
{
    public class ApproveWithReqReasonService : UserIdentity, IApproveWithReqReasonService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<ApproveWithReqReason> approveWithReqReasonRepo;
        private readonly IRepository<MAEF> maefRepo;
        private readonly IRepository<Request> requestRepo;
        private readonly IRepository<History> historyRepo;

        public ApproveWithReqReasonService(IUnitOfWork unitOfWork, IHttpContextAccessor claims) :  base(claims)
        {
            this.unitOfWork = unitOfWork;
            this.approveWithReqReasonRepo = this.unitOfWork.GetRepository<ApproveWithReqReason>();
            this.maefRepo = this.unitOfWork.GetRepository<MAEF>();
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
        }

        public async Task InsertAsync(ApproveWithReqReason approveWithReqReason)
        {
            var awrrData = await maefRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == approveWithReqReason.MAEFId);
            approveWithReqReason.AuditLogGroupId = awrrData.AuditLogGroupId;
            approveWithReqReason.HistoryGroupId = Guid.NewGuid();

           await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Approved With Requirement Details Added",
                groupCode = role,
                user = user,
                RequestId = awrrData.Id,
                AuditLogGroupId = awrrData.AuditLogGroupId,
                HistoryGroupId = approveWithReqReason.HistoryGroupId
            });             
            await approveWithReqReasonRepo.InsertAsync(approveWithReqReason);
        }


        public async Task<IPagedList<ApproveWithReqReason>> FindByMAEF(int id)
        {
            return await approveWithReqReasonRepo.GetPagedListAsync(predicate: x => x.MAEFId == id);
        }

        public async Task<ApproveWithReqReason> FindAsyncSpecific(int id)
        {
            return await approveWithReqReasonRepo.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public async Task Update(ApproveWithReqReason approveWithReqReason)
        {
            var awrrData = await maefRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == approveWithReqReason.MAEFId);
            approveWithReqReason.AuditLogGroupId = awrrData.AuditLogGroupId;
            approveWithReqReason.HistoryGroupId = Guid.NewGuid();

           await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Approved With Requirement Details Modified",
                groupCode = role,
                user = user,
                RequestId = awrrData.Id,
                AuditLogGroupId = awrrData.AuditLogGroupId,
                HistoryGroupId = approveWithReqReason.HistoryGroupId
            });             
            approveWithReqReasonRepo.Update(approveWithReqReason);
        }

        public async Task Delete(ApproveWithReqReason approveWithReqReason)
        {
            var awrrData = await maefRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == approveWithReqReason.MAEFId);
            approveWithReqReason.AuditLogGroupId = awrrData.AuditLogGroupId;
            approveWithReqReason.HistoryGroupId = Guid.NewGuid();

           await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Approved With Requirement Details Deleted",
                groupCode = role,
                user = user,
                RequestId = awrrData.Id,
                AuditLogGroupId = awrrData.AuditLogGroupId,
                HistoryGroupId = approveWithReqReason.HistoryGroupId
            });             
            approveWithReqReasonRepo.Delete(approveWithReqReason);
        }

        public async Task<MAEF> GetMaefIdByNewAffId(int id)
        {
            var request = await requestRepo.GetFirstOrDefaultAsync(predicate: x => x.Id == id, include: y => y.Include(yy => yy.MAEF));
            return request.MAEF;
        }
    }
}