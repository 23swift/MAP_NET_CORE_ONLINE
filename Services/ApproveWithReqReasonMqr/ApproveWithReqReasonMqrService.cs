using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System;

namespace MAP_Web.Services
{
    public class ApproveWithReqReasonMqrService : UserIdentity, IApproveWithReqReasonMqrService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<ApproveWithReqReasonMqr> appReqMqrRepo;
        private readonly IRepository<MAEF> maefRepo;
        private readonly IRepository<Request> requestRepo;
        private readonly IRepository<History> historyRepo;

        public ApproveWithReqReasonMqrService(IUnitOfWork unitOfWork, IHttpContextAccessor claims) :  base(claims)
        {
            this.unitOfWork = unitOfWork;
            this.appReqMqrRepo = this.unitOfWork.GetRepository<ApproveWithReqReasonMqr>();
            this.maefRepo = this.unitOfWork.GetRepository<MAEF>();
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
        }

        public async Task InsertAsync(ApproveWithReqReasonMqr appReqMqr)
        {
            var appreqmqrData = await maefRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == appReqMqr.MAEFId);
            appReqMqr.AuditLogGroupId = appreqmqrData.AuditLogGroupId;
            appReqMqr.HistoryGroupId = Guid.NewGuid();

           await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Approved With Requirement Reason MQR Added",
                groupCode = role,
                user = user,
                RequestId = appreqmqrData.Id,
                AuditLogGroupId = appReqMqr.AuditLogGroupId,
                HistoryGroupId = appReqMqr.HistoryGroupId
            }); 

            await appReqMqrRepo.InsertAsync(appReqMqr);
        }

        public async Task<IPagedList<ApproveWithReqReasonMqr>> FindByMAEF(int id)
        {
            return await appReqMqrRepo.GetPagedListAsync(predicate: x => x.MAEFId == id);
        }

        public async Task<ApproveWithReqReasonMqr> FindAsyncSpecific(int id)
        {
            return await appReqMqrRepo.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public async Task Update(ApproveWithReqReasonMqr appReqMqr)
        {
            var appreqmqrData = await maefRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == appReqMqr.MAEFId);
            appReqMqr.AuditLogGroupId = appreqmqrData.AuditLogGroupId;
            appReqMqr.HistoryGroupId = Guid.NewGuid();

           await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Approved With Requirement Reason MQR Modified",
                groupCode = role,
                user = user,
                RequestId = appreqmqrData.Id,
                AuditLogGroupId = appReqMqr.AuditLogGroupId,
                HistoryGroupId = appReqMqr.HistoryGroupId
            }); 

            appReqMqrRepo.Update(appReqMqr);
        }

        public async Task Delete(ApproveWithReqReasonMqr appReqMqr)
        {
            var appreqmqrData = await maefRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == appReqMqr.MAEFId);
            appReqMqr.AuditLogGroupId = appreqmqrData.AuditLogGroupId;
            appReqMqr.HistoryGroupId = Guid.NewGuid();

           await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Approved With Requirement Reason MQR Deleted",
                groupCode = role,
                user = user,
                RequestId = appreqmqrData.Id,
                AuditLogGroupId = appReqMqr.AuditLogGroupId,
                HistoryGroupId = appReqMqr.HistoryGroupId
            }); 

            appReqMqrRepo.Delete(appReqMqr);
        }

        public async Task<MAEF> GetMaefIdByNewAffId(int id)
        {
            var request = await requestRepo.GetFirstOrDefaultAsync(predicate: x => x.Id == id, include: y => y.Include(yy => yy.MAEF));
            return request.MAEF;
        }
    }
}