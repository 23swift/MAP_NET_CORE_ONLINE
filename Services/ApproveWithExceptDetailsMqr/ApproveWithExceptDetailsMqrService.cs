using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System;

namespace MAP_Web.Services
{
    public class ApproveWithExceptDetailsMqrService : UserIdentity, IApproveWithExceptDetailsMqrService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<ApproveWithExceptDetailsMqr> appExMqrRepo;
        private readonly IRepository<Request> requestRepo;
        private readonly IRepository<History> historyRepo;
        private readonly IRepository<MAEF> maefRepo;        

        public ApproveWithExceptDetailsMqrService(IUnitOfWork unitOfWork, IHttpContextAccessor claims) :  base(claims)
        {
            this.unitOfWork = unitOfWork;
            this.appExMqrRepo = this.unitOfWork.GetRepository<ApproveWithExceptDetailsMqr>();
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
            this.maefRepo = this.unitOfWork.GetRepository<MAEF>();
        }
        public async Task<MAEF> GetMaefIdByNewAffId(int id)
        {
            var request = await requestRepo.GetFirstOrDefaultAsync(predicate: x => x.Id == id, include: y => y.Include(yy => yy.MAEF));
            return request.MAEF;
        }
        public async Task<IPagedList<ApproveWithExceptDetailsMqr>> FindByMAEF(int id)
        {
            return await appExMqrRepo.GetPagedListAsync(predicate: x => x.MAEFId == id);
        }
        public async Task<ApproveWithExceptDetailsMqr> FindAsyncSpecific(int id)
        {
            return await appExMqrRepo.FindAsync(id);
        }
        public async Task InsertAsync(ApproveWithExceptDetailsMqr appExMqr)
        {
            var appexmqrData = await maefRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == appExMqr.MAEFId);
            appExMqr.AuditLogGroupId = appexmqrData.AuditLogGroupId;
            appExMqr.HistoryGroupId = Guid.NewGuid();

           await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Approved With Exception Details MQR Added",
                groupCode = role,
                user = user,
                RequestId = appexmqrData.Id,
                AuditLogGroupId = appExMqr.AuditLogGroupId,
                HistoryGroupId = appExMqr.HistoryGroupId
            }); 

            await appExMqrRepo.InsertAsync(appExMqr);
        }
        public async Task Update(ApproveWithExceptDetailsMqr appExMqr)
        {
            var appexmqrData = await maefRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == appExMqr.MAEFId);
            appExMqr.AuditLogGroupId = appexmqrData.AuditLogGroupId;
            appExMqr.HistoryGroupId = Guid.NewGuid();

           await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Approved With Exception Details MQR Modified",
                groupCode = role,
                user = user,
                RequestId = appexmqrData.Id,
                AuditLogGroupId = appExMqr.AuditLogGroupId,
                HistoryGroupId = appExMqr.HistoryGroupId
            });

            appExMqrRepo.Update(appExMqr);
        }
        public async Task Delete(ApproveWithExceptDetailsMqr appExMqr)
        {
            var appexmqrData = await maefRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == appExMqr.MAEFId);
            appExMqr.AuditLogGroupId = appexmqrData.AuditLogGroupId;
            appExMqr.HistoryGroupId = Guid.NewGuid();

           await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Approved With Exception Details MQR Deleted",
                groupCode = role,
                user = user,
                RequestId = appexmqrData.Id,
                AuditLogGroupId = appExMqr.AuditLogGroupId,
                HistoryGroupId = appExMqr.HistoryGroupId
            });            
            appExMqrRepo.Delete(appExMqr);
        }
        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }
    }
}