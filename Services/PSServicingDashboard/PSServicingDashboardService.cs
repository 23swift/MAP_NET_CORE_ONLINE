using System.Collections.Generic;
using System.Threading.Tasks;
using MAP_Web.Models;
using MAP_Web.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;


namespace MAP_Web.Services
{
    public class PSServicingDashboardService : IPSServicingDashboardService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Request> _requestRepo;
        private readonly IStatusService statusService;

        public PSServicingDashboardService(IUnitOfWork unitOfWork, IStatusService statusService)
        {
            _unitOfWork = unitOfWork;
            _requestRepo = _unitOfWork.GetRepository<Request>();
            this.statusService = statusService;
        }

        public async Task<List<PSServicingDashboardViewModel>> FindAsync()
        {
            var requests = await _requestRepo.GetPagedListAsync(include: r => r.Include(rr => rr.NewAffiliation)
                                                                                    .ThenInclude(ss => ss.Branches)
                                                                                        .ThenInclude(tt => tt.POS),
                                                                orderBy: x => x.OrderByDescending(y => y.Id));

            List<PSServicingDashboardViewModel> dashboardContainer = new List<PSServicingDashboardViewModel>();

            foreach (var item in requests.Items)
            {
                foreach (var branch in item.NewAffiliation.Branches)
                {
                    foreach (var pos in branch.POS)
                    {
                        dashboardContainer.Add(new PSServicingDashboardViewModel
                        {
                            RequestId = item.Id,
                            ReferenceNo = item.TrackingNo,
                            RequestersName = pos.requestersName,
                            RequestType = "New Affiliation",
                            DBAName = branch.dbaName,
                            DateRequested = item.CreatedDate.Value,
                            Status = "FOR POS PROCESSING",
                            NatureOfRequest = pos.natureOfRequest,
                            BranchId = branch.Id
                        });
                    }
                }
            }

            return dashboardContainer;
        }

        public async Task<List<DashboardViewModel>> FindRequestAsync()
        {
            
            var dashboardContainer = new List<DashboardViewModel>();
            var requests = await _requestRepo.GetPagedListAsync(
                            include: r => r.Include(rr => rr.NewAffiliation)
                                .ThenInclude(n => n.CustomerProfile),
                                orderBy: x => x.OrderByDescending(y => y.Id));

            foreach (var item in requests.Items)
            {
                dashboardContainer.Add(new DashboardViewModel
                {
                    RequestId = item.Id,
                    requestedDate = item.CreatedDate.Value,
                    businessName = item.NewAffiliation.CustomerProfile.legalName,
                    referenceNo = item.TrackingNo, //item.Id.ToString().PadLeft(7, '0') + DateTime.Now.Month.ToString().PadLeft(2, '0') + DateTime.Now.Day.ToString().PadLeft(2, '0') + DateTime.Now.Year.ToString().PadLeft(4, '0'),
                    requestedBy = "Test User",
                    status = statusService.GetStatus(item.Status),
                    tat = (int)(DateTime.Now - item.CreatedDate.Value).TotalHours
                });
            }

            return dashboardContainer;
        }
    }
}