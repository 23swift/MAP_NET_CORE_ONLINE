using System.Threading.Tasks;
using MAP_Web.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
namespace MAP_Web.Services
{
    public class BdoFormHeaderService : IBdoFormHeaderService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Request> requestRepo;
        
        public BdoFormHeaderService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
        }        

        public async Task<Request> FindAsync(int id)
        {
            return await requestRepo.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await unitOfWork.SaveChangesAsync();
        }

        public void Update(Request request, int status)
        {
            request.Status = status;
            requestRepo.Update(request);
        }


    }
}