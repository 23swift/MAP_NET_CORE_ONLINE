using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;

namespace MAP_Web.Services
{
    public class MDMHeaderService : IMDMHeaderService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IRepository<Request> requestRepo;
        public MDMHeaderService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
        }
        public async Task<MDMHeaderViewModel> GetMDMHeader(int requestId)
        {
            var request = await requestRepo.GetFirstOrDefaultAsync(predicate: r => r.Id == requestId, include: r => r.Include(rr => rr.NewAffiliation)
                                                                                                                        .ThenInclude(n => n.CustomerProfile));

            MDMHeaderViewModel model = new MDMHeaderViewModel {
                aoName = "AO NAME",
                businessUnit = "Business Unit",
                legalName = request.NewAffiliation.CustomerProfile.legalName,
                ownership = request.NewAffiliation.CustomerProfile.ownership,
                mid = "1234567890",
                requestedDate = request.CreatedDate.Value,
                requestType = request.RequestType,
                subUnitArea = "Sub Unit Area",
                mdmReviewedBy = "Reviewer Name",
                mdmReviewedDate = DateTime.Now,
                trackingNo = request.TrackingNo
            };

            return model;
        }
    }
}
