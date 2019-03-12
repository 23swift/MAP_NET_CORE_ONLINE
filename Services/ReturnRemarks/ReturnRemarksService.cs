using System;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace MAP_Web.Services
{
    public class ReturnRemarksService : IReturnRemarksService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Remark> remarkRepo;    

        public ReturnRemarksService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.remarkRepo = this.unitOfWork.GetRepository<Remark>();

        }

        public async Task<Remark> FindAsync(int id)
        {
            return await remarkRepo.FindAsync(id);
        }  

        public async Task<IPagedList<Remark>> FindByRequestAsync(int id, int status)
        {
            return await remarkRepo.GetPagedListAsync(predicate: x => x.RequestId == id && x.status == status);
        }

        public async Task<int> FindLastRemarksAsync(int id, int status)
        {
             var remarks = await remarkRepo.GetFirstOrDefaultAsync(orderBy:d => d.OrderByDescending(dd => dd.id), predicate: d => d.RequestId == id && d.status == status);// GetPagedListAsync(orderBy:d => d.OrderByDescending(dd => dd.id), predicate: d => d.RequestId == id && d.status == status);

             return remarks == null ? 0 : remarks.id;
        }

        public async Task InsertRemarksAsync(Remark remark)
        {
            await remarkRepo.InsertAsync(remark);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public async Task Update(Remark remark)
        {
            remarkRepo.Update(remark);
        }  

        public async Task<string>CheckRemarkAsync(int id, string user)
        {
            var remarks = await remarkRepo.GetFirstOrDefaultAsync(orderBy:c => c.OrderByDescending(dd => dd.id), predicate: c => c.RequestId == id && c.user == user);
            return remarks == null ? "0" : remarks.user;
        }     

    }
}