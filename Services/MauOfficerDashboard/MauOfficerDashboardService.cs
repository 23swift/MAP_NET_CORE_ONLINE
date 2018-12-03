using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;

namespace MAP_Web.Services
{
    public class MauOfficerDashboardService : IMauOfficerDashboardService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Request> _requestRepo;
        private readonly IRepository<AOMaintenance> _aoMaintenanceRepo;
        private readonly IRepository<Branch> _branchRepo;

        public MauOfficerDashboardService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _requestRepo = _unitOfWork.GetRepository<Request>();
            _aoMaintenanceRepo = _unitOfWork.GetRepository<AOMaintenance>();
            _branchRepo = _unitOfWork.GetRepository<Branch>();
        }

        public async Task<List<MauOfficerDashboardViewModel>> FindAsync()
        {
            var dashboardContainer = new List<MauOfficerDashboardViewModel>();
            var requests = await _requestRepo.GetPagedListAsync(include: r => r.Include(rr => rr.NewAffiliation).ThenInclude(ss => ss.Branches), orderBy: x => x.OrderByDescending(y => y.Id));
            //var branch = await _branchRepo.GetPagedListAsync(include: x => x.Include(xx => xx.Request));
            var testUser = "a012001164";

            foreach (var item in requests.Items)
            {
                var getRequestedBy = await _aoMaintenanceRepo.GetFirstOrDefaultAsync(predicate: x => x.userId == item.CreatedBy);
                var requestedBy = getRequestedBy == null ? "None" : getRequestedBy.firstName + " " + getRequestedBy.lastName;

                dashboardContainer.Add(new MauOfficerDashboardViewModel
                {
                    RequestId = item.Id,
                    RequestedDate = item.CreatedDate.Value,
                    // ReferenceNo = item.Id.ToString().PadLeft(7, '0'),
                    ReferenceNo = item.TrackingNo,
                    RequestedBy = requestedBy,
                    TAT = (int)(DateTime.Now - item.CreatedDate.Value).TotalHours,
                    Status = item.Owner == null ? "For Evaluation" : "For Re-Evaluation", //For Testing Purposes Only
                    isOwned = testUser == item.Owner ? true : false,
                    UserName = item.Owner,
                    DBAName = "test DBA Name",
                    BusinessName = "Test Business Name",
                    RequestType = "NEW AFFILIATION"
                });
            }

            return dashboardContainer;
        }
    }

}