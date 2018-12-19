using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
namespace MAP_Web.Services
{
    public class ApproveWithReqReasonService : IApproveWithReqReasonService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<ApproveWithReqReason> approveWithReqReasonRepo;
        private readonly IRepository<MAEF> maefRepo;
        
        public ApproveWithReqReasonService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.approveWithReqReasonRepo = this.unitOfWork.GetRepository<ApproveWithReqReason>();
            this.maefRepo = this.unitOfWork.GetRepository<MAEF>();

        }

        public async Task InsertAsync(ApproveWithReqReason approveWithReqReason)
        {
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

        public void Update(ApproveWithReqReason approveWithReqReason)
        {
            approveWithReqReasonRepo.Update(approveWithReqReason);
        }

        public void Delete(ApproveWithReqReason approveWithReqReason)
        {
            approveWithReqReasonRepo.Delete(approveWithReqReason);
        }

    }
}