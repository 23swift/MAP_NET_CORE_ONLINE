using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class ApproveWithExceptDetailsService : IApproveWithExceptDetailsService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<ApproveWithExceptDetails> approveWithExceptDetailsRepo;
        private readonly IRepository<Request> requestRepo;

        public ApproveWithExceptDetailsService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.approveWithExceptDetailsRepo = this.unitOfWork.GetRepository<ApproveWithExceptDetails>();
            this.requestRepo = this.unitOfWork.GetRepository<Request>();

        }
        public async Task InsertAsync(ApproveWithExceptDetails approveWithExceptDetails)
        {
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

        public void Update(ApproveWithExceptDetails approveWithExceptDetails)
        {
            approveWithExceptDetailsRepo.Update(approveWithExceptDetails);
        }

        public void Delete(ApproveWithExceptDetails approveWithExceptDetails)
        {
            approveWithExceptDetailsRepo.Delete(approveWithExceptDetails);
        }

        public async Task<MAEF> GetMaefIdByNewAffId(int id)
        {
            var request = await requestRepo.GetFirstOrDefaultAsync(predicate: x => x.Id == id, include: y => y.Include(yy => yy.MAEF));
            return request.MAEF;
        }
    }
}