using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class ApproveWithReqReasonMqrService : IApproveWithReqReasonMqrService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<ApproveWithReqReasonMqr> appReqMqrRepo;
        private readonly IRepository<MAEF> maefRepo;

        private readonly IRepository<Request> requestRepo;

        public ApproveWithReqReasonMqrService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.appReqMqrRepo = this.unitOfWork.GetRepository<ApproveWithReqReasonMqr>();
            this.maefRepo = this.unitOfWork.GetRepository<MAEF>();
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
        }

        public async Task InsertAsync(ApproveWithReqReasonMqr appReqMqr)
        {
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

        public void Update(ApproveWithReqReasonMqr appReqMqr)
        {
            appReqMqrRepo.Update(appReqMqr);
        }

        public void Delete(ApproveWithReqReasonMqr approveWithReqReason)
        {
            appReqMqrRepo.Delete(approveWithReqReason);
        }

        public async Task<MAEF> GetMaefIdByNewAffId(int id)
        {
            var request = await requestRepo.GetFirstOrDefaultAsync(predicate: x => x.Id == id, include: y => y.Include(yy => yy.MAEF));
            return request.MAEF;
        }
    }
}