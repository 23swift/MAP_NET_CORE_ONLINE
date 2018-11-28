using System.Threading.Tasks;
using System.Linq;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace MAP_Web.Services
{
    public class RequestHeaderService : IRequestHeaderService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Request> requestRepo;
        public RequestHeaderService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.requestRepo = unitOfWork.GetRepository<Request>();
        }
        public async Task<RequestHeaderViewModel> FindAsync(int id)
        {
            var request = await requestRepo.GetFirstOrDefaultAsync(predicate: r => r.Id == id, include: r => r.Include(rr => rr.NewAffiliation).ThenInclude(x => x.CustomerProfile));
            RequestHeaderViewModel model = new RequestHeaderViewModel
            {
                aoCode = "AO CODE",
                legalName = request.NewAffiliation.CustomerProfile.legalName,
                ownership = request.NewAffiliation.CustomerProfile.ownership,
                referenceNumber = request.TrackingNo,
                requestedDate = request.CreatedDate.Value,
            };

            return model;
        }
    }
}