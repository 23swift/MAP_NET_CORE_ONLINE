using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace MAP_Web.Services
{
    public class BdoFormHeaderService : UserIdentity, IBdoFormHeaderService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Request> requestRepo;

        private readonly IRepository<ApprovalCount> approvalCountRepo;

        private readonly IRepository<ApprovalSetup> approvalSetupRepo;

        private readonly IRepository<RequiredApproval> requiredApprovalRepo;

        private readonly IRepository<RequestApproval> requestApprovalRepo;

        
        public BdoFormHeaderService(IUnitOfWork unitOfWork, IHttpContextAccessor claims) : base(claims)
        {
            this.unitOfWork = unitOfWork;
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.approvalCountRepo = this.unitOfWork.GetRepository<ApprovalCount>();
            this.approvalSetupRepo = this.unitOfWork.GetRepository<ApprovalSetup>();
            this.requiredApprovalRepo = this.unitOfWork.GetRepository<RequiredApproval>();
            this.requestApprovalRepo = this.unitOfWork.GetRepository<RequestApproval>();
        }        

        public async Task<Request> FindAsync(int id)
        {
            return await requestRepo.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public void Update(Request request, int status)
        {
            request.Status = status;
            requestRepo.Update(request);
        }

        public async Task<int> ApproveCountAsync(int requestId)
        {   
            var approvalCount = await requestApprovalRepo.GetPagedListAsync(predicate: a => a.requestId == requestId);
            return approvalCount.Items.Where(a => a.approve == true).Select(a => a.user).Distinct().Count();
        }

        public async Task<int> CheckUserCountAsync(int requestId)
        {
            var userCount = await requestApprovalRepo.GetPagedListAsync(predicate: a => a.requestId == requestId && a.user == user);
            return userCount.TotalCount;            
        }

        public async Task<int> DeclineCountAsync(int requestId)
        {   
            var approvalCount = await requestApprovalRepo.GetPagedListAsync(predicate: a => a.requestId == requestId);
            return approvalCount.Items.Where(a => a.approve == false).Select(a => a.user).Distinct().Count();
        }

 /*       public async Task<int> IsApproveCountAsync(int requestId)
        {
            var isApproveCount = await approvalCountRepo.GetPagedListAsync(predicate: a => a.requestId == requestId);
            return isApproveCount.Items.Where(a => a.approve == true).Select(a => a.user).Distinct().Count();
        } */

        public async Task InsertAsync(RequestApproval requestApproval)
        {
            await requestApprovalRepo.InsertAsync(requestApproval);
        } 

        public async Task<int> GetApproveCount(int requestId)  //count approval count on requiredapproval table
        {  
            /*previous 
            var approvalSetup = await requiredApprovalRepo.GetFirstOrDefaultAsync(predicate: a => a.requestId == requestId);
            return approvalSetup.approvalCount;*/

            var approvalSetup = await requiredApprovalRepo.GetPagedListAsync(predicate: a => a.requestId == requestId);
            return approvalSetup.Items.Where(a => a.requestId == requestId).GroupBy(r => r.requestId).Select(a => a.Sum(c => c.approvalCount)).SingleOrDefault();
        }

        public async Task<int> CheckRequestApproveCount(int requestId)
        {
            var requestApprove = await requestApprovalRepo.GetPagedListAsync(include: r => r.Include(rr => rr.Request) ,predicate: a => a.requestId == requestId && a.Request.Status == 8);
            return requestApprove.Items.Select(a => a.user).Distinct().Count();
            
        }


    }
}