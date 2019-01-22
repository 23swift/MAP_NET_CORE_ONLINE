using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class AwrMaefFormService : IAwrMaefFormService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Request> requestRepo;
        private readonly IRepository<ApproveWithExceptDetailsAwr> appExAwrRepo;
        private readonly IRepository<AwrMaef> awrMaefRepo;
        public AwrMaefFormService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.appExAwrRepo = this.unitOfWork.GetRepository<ApproveWithExceptDetailsAwr>();
            this.awrMaefRepo = this.unitOfWork.GetRepository<AwrMaef>();
        }

        public async Task<AwrMaef> FindByMAEF(int id)
        {
            return await awrMaefRepo.GetFirstOrDefaultAsync(predicate: x => x.MAEFId == id);
        }

        public async Task<MAEF> GetMaefIdByNewAffId(int id)
        {
            var request = await requestRepo.GetFirstOrDefaultAsync(predicate: x => x.Id == id, include: y => y.Include(yy => yy.MAEF));
            return request.MAEF;
        }

        public async Task<AwrMaef> FindAsyncSpecific(int id)
        {
            var awrMaef = await awrMaefRepo.FindAsync(id);
            return awrMaef;
        }

        public async Task InsertAwrDataAsync(int Id)
        {
            var reqAppEx = await requestRepo.GetFirstOrDefaultAsync(predicate: a => a.Id == Id, include: b => b.Include(bb => bb.MAEF).ThenInclude(bbb => bbb.ApproveWithExceptDetailsMqr));

            foreach (var item in reqAppEx.MAEF.ApproveWithExceptDetailsMqr)
            {
                var appExAwrRec = await appExAwrRepo.GetFirstOrDefaultAsync(predicate: a => a.MAEFId == item.MAEFId);
                if (appExAwrRec == null)
                {
                    await appExAwrRepo.InsertAsync(new ApproveWithExceptDetailsAwr
                    {
                        awerdAwrRequirement = item.awerdMqrRequirement,
                        awerdRemarks = item.awerdRemarks,
                        awerdMqrRemarks = item.awerdMqrRemarks,
                        awerdAwrRemarks = "",
                        awerdAwrDate = item.awerdMqrDate,
                        MAEFId = item.MAEFId
                    });
                }
            }
        }

        public async Task InsertAsync(AwrMaef awrMaef)
        {
            await awrMaefRepo.InsertAsync(awrMaef);
        }

        public void Update(AwrMaef awrMaef)
        {
            awrMaefRepo.Update(awrMaef);
        }

        public void Delete(AwrMaef awrMaef)
        {
            awrMaefRepo.Delete(awrMaef);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public async Task RemoveAppExAwrDetails(int id) {
            var appExAwrDetail = await appExAwrRepo.GetPagedListAsync(predicate: a => a.MAEFId == id);
            foreach (var item in appExAwrDetail.Items)
            {
                appExAwrRepo.Delete(item);
            }
        }

        // public async Task<bool> Validate(int id)
        // {
        //     bool isValid = true;
        //     var awrMaef = awrMaefRepo.GetPagedList(predicate: x => x.MAEFId == id);

        //     if(awrMaef == null)
        //         return isValid = false;

        //     foreach (var item in awrMaef.Items)
        //     {
                
        //     }
        //     return isValid;
        // }
    }
}