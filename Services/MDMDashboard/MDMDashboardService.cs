using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;


namespace MAP_Web.Services
{
    public class MDMDashboardService : IMDMDashboardService
    {
        private readonly IRepository<Request> requestRepo;
        private readonly IUnitOfWork unitOfWork;
        private readonly IStatusService statusService;
        public MDMDashboardService(IUnitOfWork unitOfWork, IStatusService statusService)
        {
            this.unitOfWork = unitOfWork;
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.statusService = statusService;
        }

        public async Task<List<DashboardViewModel>> FindAsync()
        {
            var dashboardContainer = new List<DashboardViewModel>();
            var requests = await requestRepo.GetPagedListAsync(
                            include: r => r.Include(rr => rr.NewAffiliation)
                                .ThenInclude(n => n.CustomerProfile)
                                .Include(rr => rr.NewAffiliation.Branches),
                                orderBy: x => x.OrderByDescending(y => y.Id),
                            predicate: r => r.Status == 3 || r.Status == 4);

            foreach (var item in requests.Items)
            {
                dashboardContainer.Add(new DashboardViewModel
                {
                    RequestId = item.Id,
                    requestedDate = item.CreatedDate.Value,
                    businessName = item.NewAffiliation.CustomerProfile.legalName,
                    referenceNo = item.TrackingNo,
                    requestedBy = "Test User",
                    requestType = "NEW AFFILIATION",
                    status = statusService.GetStatus(item.Status),
                    tat = (int)(DateTime.Now - item.CreatedDate.Value).TotalHours
                });
            }

            return dashboardContainer;
        }
    }
}