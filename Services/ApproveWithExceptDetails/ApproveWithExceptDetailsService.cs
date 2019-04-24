using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System;

namespace MAP_Web.Services
{
    public class ApproveWithExceptDetailsService : UserIdentity, IApproveWithExceptDetailsService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<ApproveWithExceptDetails> approveWithExceptDetailsRepo;
        private readonly IRepository<Request> requestRepo;
        private readonly IRepository<History> historyRepo;
        private readonly IRepository<MAEF> maefRepo;

        public ApproveWithExceptDetailsService(IUnitOfWork unitOfWork, IHttpContextAccessor claims) :  base(claims)
        {
            this.unitOfWork = unitOfWork;
            this.approveWithExceptDetailsRepo = this.unitOfWork.GetRepository<ApproveWithExceptDetails>();
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.historyRepo = this.unitOfWork.GetRepository<History>();
            this.maefRepo = this.unitOfWork.GetRepository<MAEF>();

        }
        public async Task InsertAsync(ApproveWithExceptDetails approveWithExceptDetails)
        {
            var awedData = await maefRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == approveWithExceptDetails.MAEFId);
            approveWithExceptDetails.AuditLogGroupId = awedData.AuditLogGroupId;
            approveWithExceptDetails.HistoryGroupId = Guid.NewGuid();

           await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Approved With Exception Details Added",
                groupCode = role,
                user = user,
                RequestId = awedData.Id,
                AuditLogGroupId = awedData.AuditLogGroupId,
                HistoryGroupId = approveWithExceptDetails.HistoryGroupId
            }); 

    

            await approveWithExceptDetailsRepo.InsertAsync(approveWithExceptDetails);
        }
        

        public async Task<IPagedList<ApproveWithExceptDetails>> FindByMAEF(int id)
        {
            return await approveWithExceptDetailsRepo.GetPagedListAsync(predicate: x => x.MAEFId == id);
        }

        public async Task<ApproveWithExceptDetails> FindAsyncSpecific(int id)
        {
            return await approveWithExceptDetailsRepo.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public async Task Update(ApproveWithExceptDetails approveWithExceptDetails)
        {
            var awedData = await maefRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == approveWithExceptDetails.MAEFId);
            approveWithExceptDetails.AuditLogGroupId = awedData.AuditLogGroupId;
            approveWithExceptDetails.HistoryGroupId = Guid.NewGuid();

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Approved With Exception Details Modified",
                groupCode = role,
                user = user,
                RequestId = awedData.Id,
                AuditLogGroupId = awedData.AuditLogGroupId,
                HistoryGroupId = approveWithExceptDetails.HistoryGroupId
            }); 

            approveWithExceptDetailsRepo.Update(approveWithExceptDetails);
        }

        public async Task Delete(ApproveWithExceptDetails approveWithExceptDetails)
        {
            var awedData = await maefRepo.GetFirstOrDefaultAsync(predicate: c => c.Id == approveWithExceptDetails.MAEFId);
            approveWithExceptDetails.AuditLogGroupId = awedData.AuditLogGroupId;
            approveWithExceptDetails.HistoryGroupId = Guid.NewGuid();

            await historyRepo.InsertAsync(new History{
                date = DateTime.Now,
                action = "Approved With Exception Details Deleted",
                groupCode = role,
                user = user,
                RequestId = awedData.Id,
                AuditLogGroupId = awedData.AuditLogGroupId,
                HistoryGroupId = approveWithExceptDetails.HistoryGroupId
            });             
           approveWithExceptDetailsRepo.Delete(approveWithExceptDetails);
        }

        public async Task<MAEF> GetMaefIdByNewAffId(int id)
        {
            var request = await requestRepo.GetFirstOrDefaultAsync(predicate: x => x.Id == id, include: y => y.Include(yy => yy.MAEF));
            return request.MAEF;
        }
    }
}