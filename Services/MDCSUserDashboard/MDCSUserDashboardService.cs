using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;


namespace MAP_Web.Services
{
    public class MDCSUserDashboardService : IMDCSUserDashboardService
    {
        private readonly IRepository<Request> requestRepo;
        private readonly IStatusService statusService;
        private readonly IUnitOfWork unitOfWork;

        public MDCSUserDashboardService(IUnitOfWork unitOfWork,IStatusService statusService)
        {
            this.unitOfWork = unitOfWork;
            this.requestRepo = this.unitOfWork.GetRepository<Request>();
            this.statusService = statusService;
        }

        public async Task<List<DashboardViewModel>> FindAsync()
        {
            var dashboardContainer = new List<DashboardViewModel>();
            var requests = await this.requestRepo.GetPagedListAsync(include: r => r.Include(rr => rr.NewAffiliation).ThenInclude(n => n.CustomerProfile),
                                                                    orderBy: x => x.OrderByDescending(y => y.Id)
                                                                   ,predicate: z => z.Status == 19 || z.Status == 20);
            foreach (var item in requests.Items)
            {
                    dashboardContainer.Add(new DashboardViewModel
                    {
                        RequestId = item.Id,
                        requestedDate = item.CreatedDate.Value,
                        businessName = item.NewAffiliation.CustomerProfile.legalName,
                        referenceNo = item.TrackingNo,
                        requestedBy = "Test User",
                        status = statusService.GetStatus(item.Status),
                        tat = (int)(DateTime.Now - item.CreatedDate.Value).TotalHours
                    });
            }

            return dashboardContainer;
        }
    }
}