using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace MAP_Web.Services
{
    public class BdoFormHeaderService : IBdoFormHeaderService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Request> requestRepo;

        private readonly IRepository<ApprovalCount> approvalCountRepo;
        
        public BdoFormHeaderService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.approvalCountRepo = this.unitOfWork.GetRepository<ApprovalCount>();
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
            var approvalCount = await approvalCountRepo.GetPagedListAsync(predicate: a => a.requestId == requestId);
            return approvalCount.Items.Where(a => a.approve == true).Select(a => a.user).Distinct().Count();
        }

        public async Task<int> CheckUserCountAsync(int requestId, string user)
        {
            var userCount = await approvalCountRepo.GetPagedListAsync(predicate: a => a.requestId == requestId && a.user == user);
            return userCount.TotalCount;            
        }

        public async Task<int> DeclineCountAsync(int requestId)
        {   
            var approvalCount = await approvalCountRepo.GetPagedListAsync(predicate: a => a.requestId == requestId);
            return approvalCount.Items.Where(a => a.approve == false).Select(a => a.user).Distinct().Count();
        }

 /*       public async Task<int> IsApproveCountAsync(int requestId)
        {
            var isApproveCount = await approvalCountRepo.GetPagedListAsync(predicate: a => a.requestId == requestId);
            return isApproveCount.Items.Where(a => a.approve == true).Select(a => a.user).Distinct().Count();
        } */

        public async Task InsertAsync(ApprovalCount approvalCount)
        {
            await approvalCountRepo.InsertAsync(approvalCount);
        } 


    }
}