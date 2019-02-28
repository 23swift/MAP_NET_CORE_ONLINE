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

        public async Task<IPagedList<Remark>> FindByRequestAsync(int id)
        {
            return await remarkRepo.GetPagedListAsync(predicate: x => x.RequestId == id);
        }

        public async Task<int> FindLastRemarksAsync(int id)
        {
             var remarks = await remarkRepo.GetPagedListAsync(orderBy:d => d.OrderByDescending(dd => dd.id), predicate: d => d.RequestId == id);
             var lastRemarks = remarks.Items.First();
             return lastRemarks.id;
        }      

    }
}