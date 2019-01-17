using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;


namespace MAP_Web.Services
{
    public class ApproveWithExceptDetailsMqrService : IApproveWithExceptDetailsMqrService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<ApproveWithExceptDetailsMqr> appExMqrRepo;
        private readonly IRepository<Request> requestRepo;

        public ApproveWithExceptDetailsMqrService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.appExMqrRepo = this.unitOfWork.GetRepository<ApproveWithExceptDetailsMqr>();
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
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
            await appExMqrRepo.InsertAsync(appExMqr);
        }
        public void Update(ApproveWithExceptDetailsMqr appExMqr)
        {
            appExMqrRepo.Update(appExMqr);
        }
        public void Delete(ApproveWithExceptDetailsMqr appExMqr)
        {
            appExMqrRepo.Delete(appExMqr);
        }
        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }
    }
}