using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class MAEFService : IMAEFService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<MAEF> maefRepo;

        private readonly IRepository<Request> requestRepo;

        public MAEFService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.maefRepo = this.unitOfWork.GetRepository<MAEF>();
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
        }

        public async Task InsertAsync(MAEF maef)
        {
           /* var request = await requestRepo.GetFirstOrDefaultAsync(predicate: r => r.Id == maef.RequestId, include:r => r.Include(rr => rr.MAEF));
            maef.RequestId = 0;
            request.MAEF = maef;
            requestRepo.Update(request); */

             await maefRepo.InsertAsync(maef);
        }

        public async Task<MAEF> FindAsync(int id)
        {
            var maef = await maefRepo.GetFirstOrDefaultAsync(predicate: r => r.RequestId == id);
            return (maef);
        }

        public async Task<MAEF> FindAsyncMaefId(int id)
        {
            var maef = await maefRepo.GetFirstOrDefaultAsync(predicate: r => r.Id == id);
            return (maef);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public void Update(MAEF maef)
        {
            maefRepo.Update(maef);
        }

     /*   public void UpdateRequest(Request request, int maefId)
        {
            request.MAEFId = maefId;
            requestRepo.Update(request);
        } */


    }
}