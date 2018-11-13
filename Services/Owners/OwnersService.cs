using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_NET_CORE_ONLINE.Services
{
    public class OwnersService : IOwnersService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Owners> ownersRepo;
        public OwnersService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.ownersRepo = this.unitOfWork.GetRepository<Owners>();
        }

        public async Task InsertAsync(Owners owner)
        {
            await ownersRepo.InsertAsync(owner);
        }

        public async Task<Owners> FindAsync(int id)
        {
            return await ownersRepo.FindAsync(id);
        }

        public async Task<IEnumerable<Owners>> FindByCustomerAsync(int id)
        {
            throw new NotImplementedException();
            // return await ownersRepo.GetPagedListAsync(x => x.CustomerProfileId = id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public void Update(Owners owner)
        {
            ownersRepo.Update(owner);
        }

        public void Delete(Owners owner)
        {
            ownersRepo.Delete(owner);
        }
    }
}