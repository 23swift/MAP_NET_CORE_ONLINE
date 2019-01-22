using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class ApproveWithExceptDetailsAwrService : IApproveWithExceptDetailsAwrService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<ApproveWithExceptDetailsAwr> appExAwrRepo;
        private readonly IRepository<Request> requestRepo;

        public ApproveWithExceptDetailsAwrService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.appExAwrRepo = this.unitOfWork.GetRepository<ApproveWithExceptDetailsAwr>();
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
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
            await appExAwrRepo.InsertAsync(appExAwr);
        }
        public void Update(ApproveWithExceptDetailsAwr appExAwr)
        {
            appExAwrRepo.Update(appExAwr);
        }
        public void Delete(ApproveWithExceptDetailsAwr appExAwr)
        {
            appExAwrRepo.Delete(appExAwr);
        }
        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }
    }
}