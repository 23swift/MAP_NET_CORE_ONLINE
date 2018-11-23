
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MAP_Web.Models;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{

    public class AOListModalService : IAOListModalService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<AOMaintenance> _aoMaintenanceRepo;
        private readonly IRepository<Request> _requestRepo;
        public AOListModalService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _aoMaintenanceRepo = _unitOfWork.GetRepository<AOMaintenance>();
            _requestRepo = _unitOfWork.GetRepository<Request>();
        }

        public async Task<IEnumerable<AOMaintenance>> Get()
        {
            var result = _aoMaintenanceRepo.GetPagedList();
            return await result.Items.ToAsyncEnumerable().ToList();
        }

        public async Task<AOMaintenance> GetByUserName(string UserName)
        {
            var result = await _aoMaintenanceRepo.GetFirstOrDefaultAsync(predicate: x => x.userId == UserName);
            return result;
        }

        public void OwnRequest(int Id, string userId)
        {
            var request = _requestRepo.Find(Id);
            request.Id = Id;
            request.Owner = userId;
            _requestRepo.Update(request);
        }

        public async Task<Request> FindAsync(int id)
        {
            return await _requestRepo.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await _unitOfWork.SaveChangesAsync();
        }

        public void Update(Request Request)
        {
            _requestRepo.Update(Request);
        }
    
    }

}