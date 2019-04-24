using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System;

namespace MAP_Web.Services
{
    public class ApproveWithExceptDetailsAwrService : UserIdentity, IApproveWithExceptDetailsAwrService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<ApproveWithExceptDetailsAwr> appExAwrRepo;
        private readonly IRepository<Request> requestRepo;
        private readonly IRepository<History> historyRepo;
        private readonly IRepository<MAEF> maefRepo;

        public ApproveWithExceptDetailsAwrService(IUnitOfWork unitOfWork, IHttpContextAccessor claims) :  base(claims)
        {
            this.unitOfWork = unitOfWork;
            this.appExAwrRepo = this.unitOfWork.GetRepository<ApproveWithExceptDetailsAwr>();
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();  
            this.maefRepo = this.unitOfWork.GetRepository<MAEF>();          
        }
        public async Task<MAEF> GetMaefIdByNewAffId(int id)
        {
            var request = await requestRepo.GetFirstOrDefaultAsync(predicate: x => x.Id == id, include: y => y.Include(yy => yy.MAEF));
            return request.MAEF;
        }
        public async Task<IPagedList<ApproveWithExceptDetailsAwr>> FindByMAEF(int id)
        {
            return await appExAwrRepo.GetPagedListAsync(predicate: x => x.MAEFId == id);
        }
        public async Task<ApproveWithExceptDetailsAwr> FindAsyncSpecific(int id)
        {
            return await appExAwrRepo.FindAsync(id);
        }
        public async Task InsertAsync(ApproveWithExceptDetailsAwr appExAwr)
        {
            var appexData = await maefRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == appExAwr.MAEFId);
            appExAwr.AuditLogGroupId = appexData.AuditLogGroupId;
            appExAwr.HistoryGroupId = Guid.NewGuid();

           await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Approved With Requirement Details Added",
                groupCode = role,
                user = user,
                RequestId = appexData.Id,
                AuditLogGroupId = appExAwr.AuditLogGroupId,
                HistoryGroupId = appExAwr.HistoryGroupId
            });   

            await appExAwrRepo.InsertAsync(appExAwr);
        }
        public async Task Update(ApproveWithExceptDetailsAwr appExAwr)
        {
            var appexData = await maefRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == appExAwr.MAEFId);
            appExAwr.AuditLogGroupId = appexData.AuditLogGroupId;
            appExAwr.HistoryGroupId = Guid.NewGuid();

           await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Approved With Requirement Details Modified",
                groupCode = role,
                user = user,
                RequestId = appexData.Id,
                AuditLogGroupId = appExAwr.AuditLogGroupId,
                HistoryGroupId = appExAwr.HistoryGroupId
            });  

            appExAwrRepo.Update(appExAwr);
        }
        public async Task Delete(ApproveWithExceptDetailsAwr appExAwr)
        {
            var appexData = await maefRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == appExAwr.MAEFId);
            appExAwr.AuditLogGroupId = appexData.AuditLogGroupId;
            appExAwr.HistoryGroupId = Guid.NewGuid();

           await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Approved With Requirement Details Deleted",
                groupCode = role,
                user = user,
                RequestId = appexData.Id,
                AuditLogGroupId = appExAwr.AuditLogGroupId,
                HistoryGroupId = appExAwr.HistoryGroupId
            });              
            appExAwrRepo.Delete(appExAwr);
        }
        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }
    }
}